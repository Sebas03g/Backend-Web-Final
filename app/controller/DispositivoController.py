from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from app.services.GenerateCode import generar_codigo
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class DispositivoController(BaseController):
    def __init__(self, objeto, repositorio, repoUsuario, validator=None):
        super().__init__(objeto, repositorio, validator)
        self.repoUsuario = repoUsuario(Usuario)
    
    def create(self):
        data = request.json

        if self.validator:
            valid_data = self.validator().load(data)
        else:
            valid_data = data

        try:
            for _ in range(10):
                codigo = generar_codigo()
                if not self.repositorio.validate_code(codigo):
                    break
            else:
                raise Exception("No se pudo generar un código único.")
            
            valid_data["codigo"] = codigo
            nuevo_objeto = self.repositorio.create(valid_data)

            id_usuario = session.get('user_id')
            if not id_usuario:
                raise Exception("No se encontró el usuario en sesión")

            usuario_creador = self.repoUsuario.getById(int(id_usuario))

            html = (
                f"<h2>Solicitud de acceso a información</h2><br>"
                f"<p>Un administrador, con correo <strong>{usuario_creador.correo_electronico}</strong>, "
                f"solicitó acceso a la información de su cuenta:</p><br>"
                f"<h3>Datos del Usuario:</h3><br>"
                f"<p>Nombre: {nuevo_objeto.nombre_completo}</p><br>"
                f"<p>Cédula: {nuevo_objeto.cedula}</p><br>"
                f"<p>Teléfono: {nuevo_objeto.telefono}</p><br>"
                f"<h2>Código de acceso:</h2><br>"
                f"<p>{nuevo_objeto.codigo}</p><br>"
            )

            enviar_correo(
                to=[nuevo_objeto.correo_electronico, usuario_creador.correo_electronico],
                subject="Solicitud de acceso a información",
                html=html
            )

            return jsonify({
                "id": nuevo_objeto.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nuevo_objeto.to_dict()
            }), 201

        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    def user_acceptance(self, codigo):
        try:

            id_usuario = session.get('user_id')
            if not id_usuario:
                raise Exception("No se encontró el usuario en sesión")

            usuario_creador = self.repoUsuario.getById(int(id_usuario))

            dispositivo = self.repositorio.validate_code(codigo)

            if dispositivo:
                self.repositorio.update( dispositivo.id, {
                    "id_usuario":id_usuario,
                    "estado":True,
                    "monitoreo":True
                })

            html = (
                f"<h2>Dispositivo agregado</h2><br>"
                f"<p>El usuario <strong>{usuario_creador.correo_electronico}</strong>, "
                f"Sedio informacion:</p><br>"
                f"<h3>Datos del Usuario:</h3><br>"
                f"<p>Nombre: {usuario_creador.nombre_completo}</p><br>"
                f"<p>Cédula: {usuario_creador.cedula}</p><br>"
                f"<p>Teléfono: {usuario_creador.telefono}</p><br>"
            )

            enviar_correo(
                to=[dispositivo.gestor.correo_electronico, usuario_creador.correo_electronico],
                subject="Solicitud de acceso a información",
                html=html
            )

            return jsonify({
                "id": dispositivo.id,
                "mensaje": f"{self.tipoObjeto.__name__} agregada",
                "objeto": dispositivo.to_dict()
            }), 201

        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    
    def modificarEstado(self, id_dispositivo):
        try:
            dispositivo = self.repositorio.getById(int(id_dispositivo))
            if not dispositivo:
                return jsonify({"error": "Dispositivo no encontrado"}), 404

            nuevo_estado = not dispositivo.estado
            self.repositorio.update(dispositivo.id, {"estado": nuevo_estado})

            return jsonify({
                "mensaje": "Estado del dispositivo actualizado correctamente",
                "nuevo_estado": nuevo_estado
            }), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400

