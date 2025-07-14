from flask import Blueprint
from app.controller.RutaController import RutaController
from app.modelos.Ruta import Ruta
from app.repository.RutaRepo import RutaRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Ruta import RutaSchema

ruta_controller = RutaController(Ruta, RutaRepo, RutaSchema)
ruta_routes = BaseRoutes('ruta', ruta_controller)

ruta_routes.agregar_ruta_personalizada("/assign-point/<int:id>", "POST", ruta_controller.add_punto)

ruta_bp = ruta_routes.get_blueprint()