from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Tarjeta import Tarjeta
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

tarjeta_controller = BaseController(Tarjeta, BaseRepo)
tarjeta_routes = BaseRoutes('tarjeta', tarjeta_controller)

tarjeta_bp = tarjeta_routes.get_blueprint()