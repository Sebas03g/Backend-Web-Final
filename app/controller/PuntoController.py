from app.controller.BaseController import BaseController
from flask import request, jsonify

class PuntoController(BaseController):
    def __init__(self, objeto, repositorio):
        super().__init__(objeto, repositorio)
    
    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            punto = self.repositorio.create(valid_data) 
            return jsonify({"id": punto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": punto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
