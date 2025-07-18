import os
from flask import Flask, abort, request, Blueprint,send_from_directory
from app.modelos.Persona_confianza import PersonaConfianza
from app.modelos.Usuario import Usuario
from flask_jwt_extended import jwt_required
from app.controller.ImageController import ImageController

image_routes = Blueprint('image', __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

@image_routes.route('/upload-image/persona-confianza/<int:id>', methods=["PUT"])
@jwt_required()
def uploadPC(id):
    return ImageController(PersonaConfianza).UploadImage(id)

@image_routes.route('/upload-image/user/<int:id>', methods=["PUT"])
@jwt_required()
def uploadUser(id):
    return ImageController(Usuario).UploadImage(id) 

@image_routes.route('/uploads/<filename>', methods=["GET"])
def uploaded_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=False)
    except FileNotFoundError:
        abort(404, description="Archivo no encontrado")