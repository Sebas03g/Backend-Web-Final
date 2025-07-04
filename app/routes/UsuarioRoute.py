from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Usuario import Usuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

usuario_controller = BaseController(Usuario, BaseRepo)
usuario_routes = BaseRoutes('usuario', usuario_controller)

usuario_bp = usuario_routes.get_blueprint()