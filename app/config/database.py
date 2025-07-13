from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_db(app):

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:applejack@localhost:5432/trabajo_web_final'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    return db