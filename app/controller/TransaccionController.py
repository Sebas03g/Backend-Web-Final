from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from app.modelos.Plan import Plan
from flask import request, jsonify, session
from app.services.sendMail import enviar_correo

class TransaccionController(BaseController):
    def __init__(self, objeto, repositorio):
        super().__init__(objeto, repositorio)
        self.repoUsuario = repositorio(Usuario)
        self.repoPlan = repositorio(Plan)
    
    def create(self):
        data = request.json
        if self.validator != None:
            valid_data = self.validator().load(data)
        else:
            valid_data = data
        try:
            nueva_transaccion = {
                "id_usuario": valid_data["id_usuario"],
                "id_plan": valid_data["id_plan"],
            }
            nuevo_objeto = self.repositorio.create(nueva_transaccion)
            usuario_creador = self.repoUsuario.getById(int(session.get('user_id')))
            plan = self.repoPlan.getById(valid_data["id_plan"])

            html= (
                    f"<h2>Transaccion Realizada</h2></br>"
                    f"<p>Felicitaciones por tu nuevo plan, {usuario_creador.nombre_completo}.<p></br>"
                    f"<h3>Datos Plan:</h3></br>"
                    f"<p>Nombre: {plan.nombre}</p></br>"
                    f"<p>Descripcion: {plan.descripcion}</p></br>"
                    f"<p>Precio: {plan.precio}</p></br>"
                )

            enviar_correo(
                to=[usuario_creador.correo_electronico],
                subject="Cambio de Plan",
                html=html
            )

            return jsonify({
                "id": nuevo_objeto.id,
                "mensaje": f"{self.tipoObjeto.__name__} creado",
                "objeto": nuevo_objeto.to_dict()
            }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400