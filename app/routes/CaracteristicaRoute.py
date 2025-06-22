from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Caracteristica import Caracteristica
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

caracteristica_controller = BaseController(Caracteristica, BaseRepo)
caracteristica_routes = BaseRoutes('caracteristica', caracteristica_controller)

caracteristica_bp = caracteristica_routes.get_blueprint()