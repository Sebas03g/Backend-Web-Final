from app.repository.BaseRepo import BaseRepo
from app.controller.BaseController import BaseController
from flask import request, jsonify

class UbicacionUsuarioController(BaseController):
    def __init__(self, objeto, repositorio, controllerPunto):
        super().__init__(objeto, repositorio)
        self.controllerPunto = controllerPunto
    def create(self):
        data = request.json
        data_punto = {
            "lat": data["lat"],
            "lng": data["lng"]
        }
        try:
            punto = self.controllerPunto.create(data)
            data_ubicacion = {
                "id_usuario": data["id_usuario"],
                "id_punto": punto["id"]
            }
            nuevo_objeto = self.repositorio.create(data_ubicacion)
            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
