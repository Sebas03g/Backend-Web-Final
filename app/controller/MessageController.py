from flask import request, jsonify
from app.services.sendMail import enviar_correo
from app.repository.BaseRepo import BaseRepo
from app.modelos.Usuario import Usuario
from app.modelos.Dispositivo import Dispositivo

class MessageController():
    def SentMessageUser(self, id):
        data = request.json
        try:
            usuario = BaseRepo(Usuario).getById(id)
            lista_correos = [d.gestor.correo_electronico for d in usuario.dispositivos_asignados if d.gestor]
            html = (
                f"<h2>Mensaje de {usuario.nombre_completo}</h2><br>"
                f"<p>{data['mensaje']}</p><br>"
            )

            enviar_correo(
                to=lista_correos,
                subject="Mensaje",
                html=html
            )

            return jsonify({"mensaje":"Se mando el mensaje"}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400
    def SentMessageAdmin(self, id):
        data = request.json
        try:
            dispositivo = BaseRepo(Dispositivo).getById(id)

            html=(
                f"<h2>Mensaje de {dispositivo.gestor.nombre_completo}</h2>"
                f"<p>{data['mensaje']}</p>"
            )

            enviar_correo(
                to=[dispositivo.correo_electronico],
                subject="Mensaje",
                html=html
            )

            return jsonify({"mensaje":"Se mando el mensaje"}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400