from flask import Blueprint, request, jsonify, session, current_app
from app.controller.LostModeController import LostModeController
from app.controller.NotifyUserController import NotifyUserController
from flask_jwt_extended import jwt_required

notify = Blueprint('notify', __name__)

@notify.route('/lost-mode/<int:id>', methods = ['GET'])
@jwt_required()
def lostMode(id):
    return LostModeController.activate(id)

@notify.route('/notify-acces/<int:id>', methods = ['GET'])
@jwt_required()
def notifyAcces(id):
    return NotifyUserController.NotifyInformationAccess(id)