from app.repository.BaseRepo import BaseRepo
from app.controller.BaseController import BaseController
from app.modelos.Punto import Punto
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class UbicacionUsuarioController(BaseController):
    def __init__(self, objeto, repositorio, validator, repoPunto):
        super().__init__(objeto, repositorio, validator)
        self.repoPunto = repoPunto(Punto)

    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        valid_data = data
        try:
            nueva_ubicacion = {
                "id_usuario": valid_data["id_usuario"],
                "id_punto": valid_data["id_punto"]
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
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        valid_data = data
        try:
            data_ubicacion = {
                "id_usuario": valid_data["id_usuario"],
                "id_punto": valid_data["id_punto"]
            }
            objeto_modificado = self.repositorio.update(id, data_ubicacion)
            return jsonify({
                "id": objeto_modificado.id,
                "mensaje": f"{self.tipoObjeto.__name__} actualizado",
                "objeto": objeto_modificado.to_dict()
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
