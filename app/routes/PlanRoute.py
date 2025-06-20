from flask import Blueprint
from app.controller.BaseController import BaseController
from app.modelos.Plan import Plan
from app.repository.BaseRepo import BaseRepo

plan_controller = BaseController(Plan, BaseRepo)

plan_bp = Blueprint('plan_bp', __name__)

plan_bp.route('/plan', methods=['POST'])(plan_controller.create)
plan_bp.route('/plan', methods=['GET'])(plan_controller.getAll)
plan_bp.route('/plan', methods=['GET'])(plan_controller.getById)
plan_bp.route('/plan', methods=['PUT'])(plan_controller.update)
plan_bp.route('/plan', methods=['DELETE'])(plan_controller.delete)