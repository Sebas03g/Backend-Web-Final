from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Ruta import Ruta
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Ruta import RutaSchema

ruta_controller = BaseController(Ruta, BaseRepo, RutaSchema)
ruta_routes = BaseRoutes('ruta', ruta_controller)

ruta_bp = ruta_routes.get_blueprint()