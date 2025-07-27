from flask import request, jsonify
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from app.controller.TransaccionController import TransaccionController
from app.modelos.Transaccion import Transaccion
from app.repository.BaseRepo import BaseRepo
import configparser
import os

from app.validators.Transaccion import TransaccionSchema

class PagoController:

    def __init__(self):
        config = configparser.ConfigParser()
        base_dir = os.path.abspath(os.path.dirname(__file__))
        config_path = os.path.join(base_dir, '../config.ini')
        config.read(config_path)

        client_id = config["paypal"]["PAYPAL_CLIENT_ID"]
        client_secret = config["paypal"]["PAYPAL_CLIENT_SECRET"]

        environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
        self.client = PayPalHttpClient(environment)

    def createPaymentOrder(self):
        data = request.get_json()
        amount = data.get("amount")
        currency = data.get("currency", "USD")

        if not amount:
            return jsonify({"error": "El campo 'amount' es obligatorio"}), 400

        try:
            request_order = OrdersCreateRequest()
            request_order.prefer('return=representation')
            request_order.request_body({
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": currency,
                            "value": f"{float(amount):.2f}"
                        }
                    }
                ],
                "application_context": {
                    "return_url": "https://127.0.0.1:5000/account-dashboard",
                    "cancel_url": "https://127.0.0.1:5000/account-dashboard"
                }
            })

            response = self.client.execute(request_order)
            result = response.result

            return jsonify({
                "order_id": result.id,
                "status": result.status,
                "links": [
                    {"rel": link.rel, "href": link.href, "method": link.method}
                    for link in result.links
                ]
            }), 201

        except Exception as e:
            return jsonify({"error": f"Error creando la orden: {str(e)}"}), 500

    def captureOrder(self):
        data = request.get_json()
        order_id = data.get("order_id")

        if not order_id:
            return jsonify({"error": "El campo 'order_id' es obligatorio"}), 400

        try:
            request_capture = OrdersCaptureRequest(order_id)
            request_capture.request_body({})
            response = self.client.execute(request_capture)
            result = response.result

            if result.status == "COMPLETED":
                if "id_usuario" not in data:
                    return jsonify({"error": "El campo 'id_usuario' es obligatorio"}), 400

                transaccion = {
                    "order_id": order_id,
                    "id_usuario": data["id_usuario"]
                }
                if "id_plan" in data:
                    transaccion["id_plan"] = data["id_plan"]
                if "caracteristicas_usuario" in data:
                    transaccion["caracteristicas_usuario"] = data["caracteristicas_usuario"]

                transaccion_controller = TransaccionController(Transaccion, BaseRepo, TransaccionSchema)
                response, status = transaccion_controller.create(transaccion)

                return response, status

            else:
                return jsonify({
                    "message": "Pago no completado",
                    "status": result.status
                }), 400

        except Exception as e:
            return jsonify({"error": f"Error capturando el pago: {str(e)}"}), 500
