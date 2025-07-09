from app.repository.BaseRepo import BaseRepo
from app.controller.BaseController import BaseController
from flask import request, jsonify

class UbicacionUsuarioController(BaseController):
    def __init__(self, objeto, repositorio, repoPunto):
        super().__init__(objeto, repositorio)
        self.repoPunto = repoPunto

    def create(self):
        data = request.json
        try:
            punto = self.repoPunto.create({
                "lat": data["lat"],
                "lng": data["lng"]
            })
            nueva_ubicacion = {
                "id_usuario": data["id_usuario"],
                "id_punto": punto.id
            }
            nuevo_objeto = self.repositorio.create(nueva_ubicacion)
            return jsonify({
                "id": nuevo_objeto.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nuevo_objeto.to_dict()
            }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def updatePoint(self, id):
        data = request.json
        try:
            punto = self.repoPunto.create({
                "lat": data["lat"],
                "lng": data["lng"]
            })
            data_ubicacion = {
                "id_usuario": data["id_usuario"],
                "id_punto": punto.id
            }
            objeto_modificado = self.repositorio.update(id, data_ubicacion)
            return jsonify({
                "id": objeto_modificado.id,
                "mensaje": f"{self.tipoObjeto.__name__} actualizado",
                "objeto": objeto_modificado.to_dict()
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
