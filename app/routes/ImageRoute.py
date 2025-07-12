from flask import Flask, request, Blueprint,send_from_directory
import os
import io
from flask_jwt_extended import jwt_required
from app.controller.ImageController import ImageController

image_routes = Blueprint('image', __name__)

@image_routes.route('/upload-image/<int:id>', methods=["POST"])
@jwt_required()
def upload(id):
    return ImageController.UploadImage(id)

@image_routes.route('/uploads/<filename>', methods=["GET"])
@jwt_required()
def uploaded_file(filename):
    return send_from_directory('uploads', filename)