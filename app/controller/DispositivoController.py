from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class DispositivoController(BaseController):
    def __init__(self, objeto, repositorio, validator=None):
        super().__init__(objeto, repositorio, validator)
        self.repoUsuario = repositorio(Usuario)
    
    def create(self):
        data = request.json
        print(data)
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            print(valid_data)
            nuevo_objeto = self.repositorio.create(valid_data)
            print()
            usuario_creador = self.repoUsuario.getById(int(session.get('user_id')))

            html= (
                    f"<h2>Solicitud de acceso a informacion</h2></br>"
                    f"<p>Un administrados, con correo {usuario_creador.correo_electronico}, solicito acceso a su informacion de su cuenta:<p></br>"
                    f"<h3>Datos Usuario:</h3></br>"
                    f"<p>Nombre: {nuevo_objeto.nombre_completo}</p></br>"
                    f"<p>Cedula: {nuevo_objeto.cedula}</p></br>"
                    f"<p>Telefono: {nuevo_objeto.telefono}</p></br>"
                    f"<h2>Codigo:</h2></br>"
                    f"<p>Utilizar el siguiente codigo para aceptar solicitud: {nuevo_objeto.codigo}</p></br>"
                )
                

            enviar_correo(
                to=[nuevo_objeto.correo_electronico, usuario_creador.correo_electronico],
                subject="Solicitud de acceso a informacion.",
                html=html
            )

            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        
        except Exception as e:
            return jsonify({"error": str(e)}), 400