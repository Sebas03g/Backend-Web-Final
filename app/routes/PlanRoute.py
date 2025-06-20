from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Plan import Plan
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes

plan_controller = BaseController(Plan, BaseRepo)
plan_routes = BaseRoutes('plan', plan_controller)

plan_bp = plan_routes.get_blueprint()