from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Caracteristica_Usuario import Caracteristica_Usuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = BaseController(Caracteristica_Usuario, BaseRepo)
caracteristica_usuario_routes = BaseRoutes('caracteristica_usuario', controller)

bp = caracteristica_usuario_routes.get_blueprint()