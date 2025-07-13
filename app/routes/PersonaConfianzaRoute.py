from flask import Blueprint
from app.controller.PersonaConfianzaController import PersonaConfianzaController
from app.modelos.Persona_confianza import PersonaConfianza
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Persona_confianza import PersonaConfianzaSchema

controller = PersonaConfianzaController(PersonaConfianza, BaseRepo, PersonaConfianzaSchema)
permiso_confianza_routes = BaseRoutes('persona-confianza', controller)

bp = permiso_confianza_routes.get_blueprint()