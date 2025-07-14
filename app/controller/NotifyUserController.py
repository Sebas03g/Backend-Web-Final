from flask import request, jsonify
from app.repository.BaseRepo import BaseRepo
from app.modelos.Permiso_usuario import PermisoUsuario
from app.services.sendMail import enviar_correo

class NotifyUserController():
    def NotifyInformationAccess(self, id):
        try:
            permiso = BaseRepo(PermisoUsuario).getById(id)

            html = (
                f"<h2>Informacion visualizada</h2><br>"
                f"<p>El usuario administrado {permiso.dispositivo.gestor.nombre} accedio a informacion permitida por el siguiente permiso:<br>"
                f"Nombre Permiso: {permiso.permiso.nombre}<br>"
                f"Descripcion Permiso: {permiso.permiso.descripcion}</br></p>"
            )

            enviar_correo(
                to=[
                    permiso.dispositivo.usuario_asignado.correo_electronico,
                    permiso.dispositivo.gestor.correo_electronico
                ],
                subject="Informacion visualizada.",
                html=html
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 400