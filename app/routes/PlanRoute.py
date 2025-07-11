from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Plan import Plan
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Plan import PlanSchema

plan_controller = BaseController(Plan, BaseRepo, PlanSchema)
plan_routes = BaseRoutes('plan', plan_controller)

plan_bp = plan_routes.get_blueprint()