from flask import Blueprint
from app.controller.PagoController import PagoController
from flask_jwt_extended import jwt_required

paypal_routes = Blueprint('pago', __name__)
controller = PagoController()

@paypal_routes.route('/create-order', methods=['POST'])
@jwt_required()
def create_order():
    return controller.createPaymentOrder()

@paypal_routes.route('/capture-order', methods=['POST'])
@jwt_required()
def capture_order():
    return controller.captureOrder()
