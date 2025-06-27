from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Persona_confianza import PersonaConfianza
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = BaseController(PersonaConfianza, BaseRepo)
permiso_confianza_routes = BaseRoutes('persona_confianza', controller)

bp = permiso_confianza_routes.get_blueprint()