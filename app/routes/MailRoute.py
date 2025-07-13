from flask import Blueprint, request, jsonify
from app.services.sendMail import enviar_correo
from flask_jwt_extended import jwt_required, get_jwt_identity

mail_routes = Blueprint('mail', __name__)

@mail_routes.route('/send-email', methods=['POST'])
@jwt_required()
def send_mail():
    data = request.get_json()

    try:
        destinatario = data['to']
        asunto = data['subject']
        cuerpo_texto = data.get('body', '')
        cuerpo_html = data.get('html', '')

        if enviar_correo(destinatario, asunto, cuerpo_texto, cuerpo_html): 
            return jsonify({"message": "Correo enviado exitosamente"}), 200
        
        return jsonify({"message": "Error enviado mail"}), 401
        

    except Exception as e:
        return jsonify({"error": f"No se pudo enviar el correo: {str(e)}"}), 500
