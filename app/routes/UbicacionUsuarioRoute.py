from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Ubicacion_usuario import UbicacionUsuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = BaseController(UbicacionUsuario, BaseRepo)
ubicacion_usuario_routes = BaseRoutes('ubicacion-usuario', controller)

bp = ubicacion_usuario_routes.get_blueprint()