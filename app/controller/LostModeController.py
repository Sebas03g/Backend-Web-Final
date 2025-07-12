from flask import request, jsonify
from app.repository.DispositivoRepo import DispositivoRepo
from app.modelos.Dispositivo import Dispositivo
from app.services.sendMail import enviar_correo

class LostModeController():
    def activate(self, id):
        try:
            dispositivo = DispositivoRepo(Dispositivo).getById(id)
        
            html = (
                f"<h2>Permiso Otorgado</h2><br>"
                f"<p>Su administrador de cuenta {dispositivo.gestor.correo_electronico} "
                f"Activo el modo perdida esto significa que tendra acceso a todos los permiso de nivel 3.</p><br>"
            )

            enviar_correo(
                to=[
                    dispositivo.usuario_asignado.correo_electronico,
                    dispositivo.gestor.correo_electronico
                ],
                subject="Activacion modo perdida.",
                html=html
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 400
