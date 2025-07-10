from flask_mail import Message
from app.config.mail import mail

def enviar_correo(to, subject, body="", html=""):
    try:
        msg = Message(
            subject=subject,
            recipients=to,
            body=body,
            html=html
        )
        mail.send(msg)
        return True
    except Exception as e:
        print("Error al enviar correo:", str(e))
        return False
