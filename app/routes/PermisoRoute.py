from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Permiso import Permiso
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

permiso_controller = BaseController(Permiso, BaseRepo)
permiso_routes = BaseRoutes('permiso', permiso_controller)

permiso_bp = permiso_routes.get_blueprint()