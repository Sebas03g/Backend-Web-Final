from flask import Flask, request, Blueprint
import os
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

image_routes = Blueprint('image', __name__)

SERVICE_ACCOUNT_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/drive.file'] 
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
drive_service = build('drive', 'v3', credentials=credentials)

@image_routes.route('/upload', methods=['POST'])
def upload():
    file = request.files['imagenPersona']
    if file:
        file_metadata = {'name': file.filename}
        media = MediaIoBaseUpload(file.stream, mimetype=file.content_type)
        uploaded_file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        file_id = uploaded_file.get('id')
        drive_service.permissions().create(
            fileId=file_id,
            body={'type': 'anyone', 'role': 'reader'}
        ).execute()
        
        file_url = f"https://drive.google.com/uc?id={file_id}"
        return {'success': True, 'url': file_url}
    return {'success': False}, 400
