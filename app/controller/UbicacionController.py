from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from app.modelos.Punto import Punto
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class UbicacionController(BaseController):
    def __init__(self, objeto, repositorio, validator, repoPunto):
        super().__init__(objeto, repositorio, validator)
        self.repoPunto = repoPunto(Punto)
        self.repoUsuario = repositorio(Usuario)
    
    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            punto = self.repoPunto.create({
                "lat": valid_data["lat"],
                "lng": valid_data["lng"]
            })

            nueva_ubicacion = {
                "nombre_ubicacion": valid_data["nombre_ubicacion"],
                "descripcion": valid_data["descripcion"],
                "tipo": valid_data["tipo"],
                "nivel": valid_data["nivel"],
                "id_usuario": valid_data["id_usuario"],
                "id_punto": punto.id,
            }
            usuario = self.repoUsuario.getById(valid_data["id_usuario"])
            nuevo_objeto = self.repositorio.create(nueva_ubicacion)
            usuario_creador = self.repoUsuario.getById(session.get('user_id'))

            html = (
                f"<h2>Ubicacion Creada</h2><br>"
                f"<p>El administrador de su cuenta con correo {usuario_creador.correo_electronico} creó la siguiente ubicación:</p><br>"
                f"<h3>Datos Ubicación:</h3><br>"
                f"<p>Nombre: {valid_data['nombre_ubicacion']}</p><br>"
                f"<p>Descripción: {valid_data['descripcion']}</p><br>"
                f"<p>Tipo: {valid_data['tipo']}</p><br>"
                f"<p>Nivel: {valid_data['nivel']}</p><br>"
            )


            enviar_correo(
                to=usuario_creador.correo_electronico,
                subject="Creacion de Ubicacion",
                html=html
            )
            

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
        try:
            punto = self.repoPunto.create({
                "lat": valid_data["lat"],
                "lng": valid_data["lng"]
            })
            data_ubicacion = {
                "id_usuario": valid_data["id_usuario"],
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