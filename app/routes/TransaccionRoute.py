from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Transaccion import Transaccion
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

transaccion_controller = BaseController(Transaccion, BaseRepo)
transaccion_routes = BaseRoutes('transaccion', transaccion_controller)

transaccion_bp = transaccion_routes.get_blueprint()