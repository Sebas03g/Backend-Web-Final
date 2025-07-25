from flask import request, jsonify
from app.repository.BaseRepo import BaseRepo
from app.modelos.Usuario import Usuario
from app.services.sendMail import enviar_correo

class LostModeController:

    def __init__(self):
        self.repo = BaseRepo(Usuario)

    def activate(self, id):
        try:
            usuario = self.repo.getById(id)

            print("ENTRO LOSTMODE")
            print(id)

            if not usuario:
                return jsonify({"error": "Usuario no encontrado"}), 404
            
            lista_correos = [usuario.correo_electronico]
            for dispositivo in usuario.dispositivos_asignados:
                if dispositivo.gestor and dispositivo.gestor.correo_electronico not in lista_correos:
                    lista_correos.append(dispositivo.gestor.correo_electronico)

            nuevo_estado = not usuario.modo_perdida

            print(nuevo_estado)

            if nuevo_estado:
                html = (
                    f"<h2>Modo Pérdida Activado</h2><br>"
                    f"<p>El modo pérdida ha sido activado para su cuenta.</p><br>"
                    f"<p>Esto significa que sus administradores tendrán acceso a todos los permisos de nivel 3.</p><br>"
                )
            else:
                html = (
                    f"<h2>Modo Pérdida Desactivado</h2><br>"
                    f"<p>El modo pérdida ha sido desactivado para su cuenta.</p><br>"
                    f"<p>Esto significa que sus administradores perderán acceso a los permisos de nivel 3.</p><br>"
                )
            self.repo.update(usuario.id, {"modo_perdida": nuevo_estado})

            enviar_correo(
                to=lista_correos,
                subject="Estado del Modo Pérdida actualizado",
                html=html
            )

            mensaje_estado = "activado" if nuevo_estado else "desactivado"
            return jsonify({"mensaje": f"Modo pérdida {mensaje_estado} correctamente."}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400
