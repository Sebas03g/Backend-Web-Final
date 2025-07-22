from app.repository.BaseRepo import BaseRepo
from app.controller.BaseController import BaseController
from app.modelos.Punto import Punto
from app.modelos.Ruta import Ruta
from app.modelos.Usuario import Usuario
from app.validators.Punto import PuntoSchema
from flask import request, jsonify
from datetime import datetime

class UbicacionUsuarioController(BaseController):
    def __init__(self, objeto, repositorio, validator, repoPunto, repoRuta):
        super().__init__(objeto, repositorio, validator)
        self.repoPunto = repoPunto(Punto)
        self.repoRuta = repoRuta(Ruta)
        self.repoUsuario = repositorio(Usuario)

    def create(self):
        try:
            data = request.json
            valid_data = self.validator().load(data) if self.validator else data
            punto = self.repoPunto.create({
                "lat": valid_data["lat"],
                "lng": valid_data["lng"]
            })
            nueva_ubicacion = {
                "id_usuario": valid_data["id_usuario"],
                "id_punto": punto.id
            }

            nuevo_objeto = self.repositorio.create(nueva_ubicacion)

            return jsonify({
                "id": nuevo_objeto.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nuevo_objeto.to_dict()
            }), 201

        except Exception as e:
            return jsonify({"error": f"Error al crear ubicación: {str(e)}"}), 400

    def updatePoint(self, id, external_data=None):
        try:
            data = external_data if external_data else request.json
            valid_data = PuntoSchema().load(data) if self.validator else data
            
            data_punto = {
                "lat": valid_data["lat"],
                "lng": valid_data["lng"]
            }

            punto = self.repoPunto.create(data_punto)

            objeto_modificado = self.repositorio.update(id, {
                "id_punto": punto.id
            })

            usuario = objeto_modificado.usuario
            id_usuario = usuario.id

            es_nueva_ubicacion = not any(u.id_usuario == id_usuario for u in punto.ubicaciones)

            if es_nueva_ubicacion:
                id_ruta = usuario.id_ruta_activa

                if id_ruta is None:
                    nueva_ruta = self.repoRuta.create({"id_usuario": id_usuario})
                    id_ruta = nueva_ruta.id

                self.repoRuta.assing_point(punto.id, id_ruta)
            else:
                id_ruta = usuario.id_ruta_activa
                if id_ruta is not None:
                    self.repoRuta.update(id_ruta, {"hora_fin": datetime.now().time})
                self.repoUsuario.update(id_usuario, {"id_ruta_activa": None})
                 

            return jsonify({
                "id": usuario.id,
                "mensaje": f"{self.tipoObjeto.__name__} actualizado",
                "objeto": usuario.to_dict()
            }), 200

        except Exception as e:
            return jsonify({"error": f"Error al actualizar punto: {str(e)}"}), 400
