from app.controller.BaseController import BaseController
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

class UsuarioController(BaseController):
    def __init__(self, objeto, repositorio):
        super().__init__(objeto, repositorio)
    
    def create(self):
        data = request.json
        data['contrasena_hash'] = generate_password_hash(data['contrasena_hash'])
        try:
            nuevo_objeto = self.repositorio.create(data)
            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400