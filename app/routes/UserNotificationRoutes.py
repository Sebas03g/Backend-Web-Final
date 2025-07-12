from flask import Blueprint, request, jsonify, session, current_app
from app.controller.LostModeController import LostModeController
from app.controller.NotifyUserController import NotifyUserController
notify = Blueprint('notify', __name__)

@notify.route('/lost-mode/<int:id>', methods = ['GET'])
def lostMode(id):
    return LostModeController.activate(id)

@notify.route('/notify-acces/<int:id>', methods = ['GET'])
def notifyAcces(id):
    return NotifyUserController.NotifyInformationAccess(id)