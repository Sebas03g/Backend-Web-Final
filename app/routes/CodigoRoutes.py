from flask import Blueprint, request, jsonify
from app.controller.BaseController import BaseController
from app.modelos.Dispositivo import Dispositivo
from app.repository.BaseRepo import BaseRepo

from app.services.GenerateCode import generar_codigo

codigo_routes = Blueprint('codigo', __name__)

@codigo_routes.route('/code', methods = ['GET'])
def enviar_codigo():
    codigo = generar_codigo()
    controller = BaseController(Dispositivo, BaseRepo)
    dispositivos = controller.getAll()
    while(codigo in [dispositivo.codigo for dispositivo in dispositivos]):
        codigo = generar_codigo()

    return jsonify({"codigo": codigo})
