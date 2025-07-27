from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()
load_dotenv()

def create_db(app):

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    return db