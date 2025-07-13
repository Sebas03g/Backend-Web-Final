from flask import Blueprint, request, jsonify, session, current_app
from app.controller.LostModeController import LostModeController
from app.controller.NotifyUserController import NotifyUserController
from app.controller.MessageController import MessageController
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

@notify.route('/message/user/<int:id>', methods = ["POST"])
@jwt_required()
def messageUser(id):
    return MessageController.SentMessageUser(id)

@notify.route('/message/admin/<int:id>', methods = ["POST"])
@jwt_required()
def messageAdmin(id):
    return MessageController.SentMessageAdmin(id)