from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Ubicacion import Ubicacion
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

ubicacion_controller = BaseController(Ubicacion, BaseRepo)
ubicacion_routes = BaseRoutes('ubicacion', ubicacion_controller)

ubicacion_bp = ubicacion_routes.get_blueprint()