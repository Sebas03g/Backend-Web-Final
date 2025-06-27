from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Permiso_usuario import PermisoUsuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = BaseController(PermisoUsuario, BaseRepo)
permiso_usuario_routes = BaseRoutes('permiso_usuario', controller)

bp = permiso_usuario_routes.get_blueprint()