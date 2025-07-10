from flask import Blueprint
from app.controller.PersonaConfianzaController import PersonaConfianzaController
from app.modelos.Persona_confianza import PersonaConfianza
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

controller = PersonaConfianzaController(PersonaConfianza, BaseRepo, BaseRepo)
permiso_confianza_routes = BaseRoutes('persona_confianza', controller)

bp = permiso_confianza_routes.get_blueprint()