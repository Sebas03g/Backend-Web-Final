from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Tarjeta import Tarjeta
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Tarjeta import TarjetaSchema

tarjeta_controller = BaseController(Tarjeta, BaseRepo, TarjetaSchema)
tarjeta_routes = BaseRoutes('tarjeta', tarjeta_controller)

tarjeta_bp = tarjeta_routes.get_blueprint()