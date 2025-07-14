import os
import uuid
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
from app.modelos.Persona_confianza import PersonaConfianza
from app.repository.BaseRepo import BaseRepo

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

class ImageController:

    def __init__(self, tipoObjeto):
        self.tipoObjeto = tipoObjeto

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def UploadImage(self, id):
        if 'archivo' not in request.files:
            return jsonify({"error": "No se envió ningún archivo"}), 400

        archivo = request.files['archivo']

        if archivo.filename == '':
            return jsonify({"error": "Nombre de archivo vacío"}), 400

        if archivo and self.allowed_file(archivo.filename):
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            filename = f"{uuid.uuid4().hex}_{secure_filename(archivo.filename)}"
            ruta_destino = os.path.join(UPLOAD_FOLDER, filename)

            try:
                archivo.save(ruta_destino)
                BaseRepo(self.tipoObjeto).update(id, {"imagen": filename})
                return jsonify({"message": "Archivo subido correctamente", "ruta": filename}), 200
            except Exception as e:
                return jsonify({"error": str(e)}), 500

        return jsonify({"error": "Extensión de archivo no permitida"}), 400
