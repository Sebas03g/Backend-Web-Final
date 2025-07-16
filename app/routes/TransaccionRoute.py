from flask import Blueprint
from app.controller.TransaccionController import TransaccionController
from app.modelos.Transaccion import Transaccion
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Transaccion import TransaccionSchema

transaccion_controller = TransaccionController(Transaccion, BaseRepo, TransaccionSchema)
transaccion_routes = BaseRoutes('transaccion', transaccion_controller)

transaccion_bp = transaccion_routes.get_blueprint()