# app/config/mail_config.py

from flask_mail import Mail
import configparser
import os

mail = Mail()

def create_mail(app):
    config = configparser.ConfigParser()

    # Usar ruta absoluta segura para encontrar config.ini
    base_dir = os.path.abspath(os.path.dirname(__file__))
    config_path = os.path.join(base_dir, '../config.ini')
    config.read(config_path)

    # Configuración del servidor SMTP
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = config["mail"]["username"]
    app.config['MAIL_PASSWORD'] = config["mail"]["password"]
    app.config['MAIL_DEFAULT_SENDER'] = config["mail"]["username"]

    # Inicializar extensión Mail con la app
    mail.init_app(app)

    return mail
