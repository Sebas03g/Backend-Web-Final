from app.controller.BaseController import BaseController
from flask import request, jsonify, session
from app.modelos.Usuario import Usuario
from app.services.sendMail import enviar_correo

class PersonaConfianzaController(BaseController):
    def __init__(self, objeto, repositorio, validator):
        super().__init__(objeto, repositorio, validator)
        self.repoUsuario = repositorio(Usuario)
    
    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            usuario = self.repoUsuario.getById(valid_data["id_usuario"])
            nuevo_objeto = self.repositorio.create(valid_data)
            usuario_creador = self.repoUsuario.getById(session.get('user_id'))

            html= f"<h2>Persona de Confianza Creada</h2></br>"
            +f"<p>El administrador de su cuenta con correo {usuario_creador.correo_electronico} creo la siguiente persona de confianza:<p></br>"
            +f"<h3>Datos Persona:</h3></br>"
            +f"<p>Nombre: {usuario.nombre}</p></br>"
            +f"<p>Telefono: {usuario.telefono}</p></br>"
            +f"<p>Descripcion: {usuario.descripcion}</p></br>"
                

            enviar_correo(
                to=usuario_creador.correo_electronico,
                subject="Creacion Persona de Confianza",
                html=html
            )

            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        
        except Exception as e:
            return jsonify({"error": str(e)}), 400