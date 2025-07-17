from app.controller.BaseController import BaseController
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.services.sendMail import enviar_correo
from app.modelos.Ubicacion_usuario import UbicacionUsuario

class UsuarioController(BaseController):
    def __init__(self, objeto, repositorio,UsuarioSchema):
        super().__init__(objeto, repositorio,UsuarioSchema)
        self.repoUbiUsuario = repositorio(UbicacionUsuario)
    
    def create(self, data=None):
        if data is None:
            data = request.json
        print(data)
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        valid_data['contrasena_hash'] = generate_password_hash(valid_data['contrasena_hash'])
        try:
            nuevo_objeto = self.repositorio.create(valid_data)

            self.repoUbiUsuario.create({"id_usuario":nuevo_objeto.id})

            return nuevo_objeto
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    def update(self, id):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            if 'contrasena_hash' in valid_data:
                valid_data['contrasena_hash'] = generate_password_hash(valid_data['contrasena_hash'])
            objeto_modificado = self.repositorio.update(id, valid_data)
            if not objeto_modificado:
                return jsonify({"error": f"{self.tipoObjeto.__name__} no encontrado"}), 404
            
            enviar_correo(
                to=[data["correo_electronico"]],
                subject="Modificacion datos cuenta Ubikme",
                body="",
                html='<h2>Datos de Cuenta Modificados Exitosamente</h2></br><h3>Datos modificados existosamente</h3></br><p>Inicia sesión en este enlace: </p><a></a><a href="http://127.0.0.1:5000">Enlace aquí</a>'
            )

            return jsonify({"id": objeto_modificado.id, "mensaje": f"{self.tipoObjeto.__name__} actualizado", "objeto": objeto_modificado.to_dict()}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400