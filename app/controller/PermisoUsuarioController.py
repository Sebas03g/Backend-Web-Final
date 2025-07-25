from app.controller.BaseController import BaseController
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class PermisoUsuarioController(BaseController):
    def __init__(self, objeto, repositorio, validator=None):
        super().__init__(objeto, repositorio, validator)
    
    def create(self):
        data = request.json
        if self.validator:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            print(valid_data)
            nuevo_objeto = self.repositorio.create(valid_data)
            print(nuevo_objeto)
            print(nuevo_objeto.to_dict())

            html = (
                f"<h2>Permiso Otorgado</h2><br>"
                f"<p>El usuario administrado por usted con correo {nuevo_objeto.dispositivo.correo_electronico} "
                f"Le otorgó el siguiente permiso:</p><br>"
                f"<h3>Permiso:</h3><br>"
                f"<p>Nombre: {nuevo_objeto.permiso.nombre}</p><br>"
                f"<p>Descripción: {nuevo_objeto.permiso.descripcion}</p><br>"
            )

            enviar_correo(
                to=[
                    nuevo_objeto.dispositivo.usuario_asignado.correo_electronico,
                    nuevo_objeto.dispositivo.gestor.correo_electronico
                ],
                subject="Se otorgó el siguiente permiso",
                html=html
            )

            return jsonify({
                "id": nuevo_objeto.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nuevo_objeto.to_dict()
            }), 201

        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    def delete(self, id):
        try:
            eliminado = self.repositorio.delete(id)
            if not eliminado:
                return jsonify({"error": f"{self.tipoObjeto.__name__} no encontrado"}), 404

            html = (
                f"<h2>Permiso Denegado</h2><br>"
                f"<p>El usuario administrado por usted con correo {eliminado.dispositivo.correo_electronico} "
                f"Le denego el siguiente permiso:</p><br>"
                f"<h3>Permiso:</h3><br>"
                f"<p>Nombre: {eliminado.permiso.nombre}</p><br>"
                f"<p>Descripción: {eliminado.permiso.descripcion}</p><br>"
            )

            enviar_correo(
                to=[
                    eliminado.dispositivo.usuario_asignado.correo_electronico,
                    eliminado.dispositivo.gestor.correo_electronico
                ],
                subject="Se denego el siguiente permiso",
                html=html
            )

            return jsonify({
                "id": eliminado.id,
                "mensaje": f"Permiso denegado correctamente",
                "objeto": eliminado.to_dict()
            }), 200

        except Exception as e:
            return jsonify({"error": f"Error al denegar el permiso: {str(e)}"}), 400
    
    def modifyAllState(self, id):
        data = request.json
        try:
            if "id_permiso" not in data or "estado" not in data:
                return jsonify({"error": "Faltan campos requeridos (id_permiso o estado)"}), 400

            id_permiso = int(data["id_permiso"])
            permisoUsuario = self.repositorio.getAll()
            listaUsuarios = []
            puFiltrados = [
                pu for pu in permisoUsuario 
                if pu.id_permiso == id_permiso and pu.dispositivo.id_usuario == id
            ]

            if not puFiltrados:
                return jsonify({"error": "No se encontraron permisos para ese usuario"}), 404

            usuario = puFiltrados[0].dispositivo.usuario_asignado
            permiso = puFiltrados[0].permiso

            for pu in puFiltrados:
                self.repositorio.update(pu.id, {"estado": data["estado"]})
                listaUsuarios.append(pu.dispositivo.gestor.correo_electronico)

            html = (
                f"<h2>Permiso Denegado</h2><br>"
                f"<p>El usuario administrado por usted con correo {usuario.correo_electronico} "
                f"le denegó el siguiente permiso:</p><br>"
                f"<h3>Permiso:</h3><br>"
                f"<p>Nombre: {permiso.nombre}</p><br>"
                f"<p>Descripción: {permiso.descripcion}</p><br>"
            )

            enviar_correo(
                to=listaUsuarios,
                subject="Se denegó el siguiente permiso",
                html=html
            )

            return jsonify({
                "id": permiso.id,
                "mensaje": f"Permiso denegado correctamente",
                "objeto": permiso.to_dict()
            }), 200

        except Exception as e:
            return jsonify({"error": f"Error al denegar el permiso: {str(e)}"}), 400

