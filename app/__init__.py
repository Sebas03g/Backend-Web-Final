from flask import Flask
from .config import database

def create_app():
    app = Flask(__name__)
    db = database.create_db(app)

    from .modelos import Usuario

    with app.app_context():
        db.create_all()
    return app
