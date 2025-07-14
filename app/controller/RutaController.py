from app.controller.BaseController import BaseController
from flask import request, jsonify
from app.modelos.Punto import Punto
from app.repository.PuntoRepo import PuntoRepo
from app.validators.Punto import PuntoSchema

class RutaController(BaseController):
    def __init__(self, objeto, repositorio, validator):
        super().__init__(objeto, repositorio, validator)
        self.validatePoint = PuntoSchema()
        self.puntoRepo = PuntoRepo(Punto)
    def add_punto(self, id):
        data = request.json
        if self.validatePoint != None:
            valid_data = self.validatePoint.load(data)
        else:
            valid_data = data
        try:
            print("AQUIII")
            print(valid_data)
            punto = self.puntoRepo.create(valid_data)
            print("PASAAAAAAAA")
            print(punto.id)
            rutaPunto = self.repositorio.assing_point(punto.id, id)
            print("PASAAAAAA  222")
            return jsonify({"id": rutaPunto.id, "mensaje": f"Punto agregado a ruta", "objeto": rutaPunto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
