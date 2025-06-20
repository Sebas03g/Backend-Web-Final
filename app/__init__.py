from flask import Flask
from app.config.database import db

def create_app():
    app = Flask(__name__)

    with app.app_context():
        db.create_all()
    return app
