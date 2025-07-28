from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from app.modelos.Plan import Plan
from app.modelos.Caracteristica_Usuario import Caracteristica_Usuario
from app.modelos.Transaccion import Transaccion
from app.config.database import db
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class TransaccionController(BaseController):
    def __init__(self, objeto, repositorio, validator):
        super().__init__(objeto, repositorio, validator)
        self.repoUsuario = repositorio(Usuario)
        self.repoPlan = repositorio(Plan)
        self.repoCU = repositorio(Caracteristica_Usuario)

    def create(self, external_data=None):
        data = external_data if external_data else request.json

        if self.validator is not None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data

        try:

            nueva_transaccion = Transaccion(
                id_usuario=valid_data["id_usuario"],
                order_id=valid_data["order_id"]
            )

            if "id_plan" in valid_data:
                nueva_transaccion.id_plan = valid_data["id_plan"]

            db.session.add(nueva_transaccion)
            db.session.flush() 

            if "caracteristicas_usuario" in valid_data:
                for cu in valid_data["caracteristicas_usuario"]:
                    caracteristica = Caracteristica_Usuario(
                        valor=cu["valor"],
                        id_caracteristica=cu["id_caracteristica"],
                        id_usuario=valid_data["id_usuario"],
                        id_transaccion=nueva_transaccion.id
                    )
                    db.session.add(caracteristica)

            db.session.commit()
            db.session.refresh(nueva_transaccion)

            id_usuario_sesion = session.get('user_id')
            if not id_usuario_sesion:
                raise Exception("Usuario no autenticado en la sesión")

            usuario_creador = self.repoUsuario.getById(int(id_usuario_sesion))
            self.repoUsuario.update(id = int(id_usuario_sesion), data = {"id_plan":valid_data["id_plan"]})

            plan = self.repoPlan.getById(valid_data["id_plan"]) if "id_plan" in valid_data else None

            if plan:
                html = (
                    f"<h2>Transacción Realizada</h2><br>"
                    f"<p>Felicitaciones por tu nuevo plan, {usuario_creador.nombre_completo}.</p><br>"
                    f"<h3>Datos del Plan:</h3><br>"
                    f"<p><strong>Nombre:</strong> {plan.nombre}</p><br>"
                    f"<p><strong>Descripción:</strong> {plan.descripcion}</p><br>"
                    f"<p><strong>Precio:</strong> ${plan.precio}</p><br>"
                )
                subject = "Cambio de Plan"
            else:
                html = (
                    f"<h2>Transacción Realizada</h2><br>"
                    f"<p>Felicitaciones por la compra, {usuario_creador.nombre_completo}.</p><br>"
                )
                subject = "Transacción"

            enviar_correo(
                to=[usuario_creador.correo_electronico],
                subject=subject,
                html=html
            )

            return jsonify({
                "id": nueva_transaccion.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nueva_transaccion.to_dict()
            }), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

