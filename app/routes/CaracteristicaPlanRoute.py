from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Caracteristica_Plan import Caracteristica_Plan
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Caracteristica_Plan import CaracteristicaPlanSchema

controller = BaseController(Caracteristica_Plan, BaseRepo, CaracteristicaPlanSchema)
caracteristica_plan_routes = BaseRoutes('caracteristica_plan', controller)

bp = caracteristica_plan_routes.get_blueprint()