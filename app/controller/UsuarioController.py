from app.controller.BaseController import BaseController
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

class UsuarioController(BaseController):
    def __init__(self, objeto, repositorio,UsuarioSchema):
        super().__init__(objeto, repositorio,UsuarioSchema)
    
    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        valid_data['contrasena_hash'] = generate_password_hash(valid_data['contrasena_hash'])
        try:
            nuevo_objeto = self.repositorio.create(valid_data)
            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400