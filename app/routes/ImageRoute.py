from flask import Flask, request, Blueprint,send_from_directory
import os
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from app.controller.ImageController import ImageController

image_routes = Blueprint('image', __name__)

@image_routes.route('/upload-image/<int:id>', method=["POST"])
def upload(id):
    return ImageController.UploadImage(id)

@image_routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)