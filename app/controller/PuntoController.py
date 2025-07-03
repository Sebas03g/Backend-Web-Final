from app.controller.BaseController import BaseController
from flask import request, jsonify

class PuntoController(BaseController):
    def __init__(self, objeto, repositorio):
        super().__init__(objeto, repositorio)
    
    def create(self):
        data = request.json
        try:
            punto = self.repositorio.getByCords(data)
            if punto == None:
                punto = self.repositorio.create(data)
            return jsonify({"id": punto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": punto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
