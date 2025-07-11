from flask import Blueprint
from app.controller.UsuarioController import UsuarioController
from app.modelos.Usuario import Usuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Usuario import UsuarioSchema

usuario_controller = UsuarioController(Usuario, BaseRepo, UsuarioSchema)
usuario_routes = BaseRoutes('usuario', usuario_controller)

usuario_bp = usuario_routes.get_blueprint()