from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Punto import Punto
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

punto_controller = BaseController(Punto, BaseRepo)
punto_routes = BaseRoutes('punto', punto_controller)

punto_bp = punto_routes.get_blueprint()