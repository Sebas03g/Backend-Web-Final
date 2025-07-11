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
        try:
            punto = self.repoPunto.create({
                "lat": data["lat"],
                "lng": data["lng"]
            })

            nueva_ubicacion = {
                "nombre_ubicacion": data["nombre_ubicacion"],
                "descripcion": data["descripcion"],
                "tipo": data["tipo"],
                "nivel": data["nivel"],
                "id_usuario": data["id_usuario"],
                "id_punto": punto.id,
            }
            usuario = self.repoUsuario.getById(data["id_usuario"])
            nuevo_objeto = self.repositorio.create(nueva_ubicacion)
            usuario_creador = self.repoUsuario.getById(session.get('user_id'))

            html = (
                f"<h2>Ubicacion Creada</h2><br>"
                f"<p>El administrador de su cuenta con correo {usuario_creador.correo_electronico} creó la siguiente ubicación:</p><br>"
                f"<h3>Datos Ubicación:</h3><br>"
                f"<p>Nombre: {data['nombre_ubicacion']}</p><br>"
                f"<p>Descripción: {data['descripcion']}</p><br>"
                f"<p>Tipo: {data['tipo']}</p><br>"
                f"<p>Nivel: {data['nivel']}</p><br>"
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