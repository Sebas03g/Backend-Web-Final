from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Dispositivo import Dispositivo
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = BaseController(Dispositivo, BaseRepo)
dispositivo_routes = BaseRoutes('dispositivo', controller)

bp = dispositivo_routes.get_blueprint()