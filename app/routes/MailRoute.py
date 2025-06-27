from flask_mail import Message
from flask import Blueprint, request, jsonify
from app.config.mail import mail

mail_routes = Blueprint('mail', __name__)

@mail_routes.route('/send-email', methods=['POST'])
def enviar_correo():
    data = request.get_json()

    try:
        destinatario = data['to']
        asunto = data['subject']
        cuerpo_texto = data.get('body', '')
        cuerpo_html = data.get('html', '')

        msg = Message(
            subject=asunto,
            recipients=[destinatario],
            body=cuerpo_texto,
            html=cuerpo_html
        )

        mail.send(msg)
        return jsonify({"message": "Correo enviado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": f"No se pudo enviar el correo: {str(e)}"}), 500
