from flask import Blueprint
from app.controller.UbicacionController import UbicacionController
from app.modelos.Ubicacion import Ubicacion
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Ubicacion import UbicacionSchema
from app.repository.PuntoRepo import PuntoRepo

ubicacion_controller = UbicacionController(Ubicacion, BaseRepo, UbicacionSchema, PuntoRepo)
ubicacion_routes = BaseRoutes('ubicacion', ubicacion_controller)

ubicacion_bp = ubicacion_routes.get_blueprint()