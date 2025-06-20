from flask import Flask
from app.config.database import db
from app.routes.PlanRoute import plan_routes

def create_app():
    app = Flask(__name__)

    app.register_blueprint(plan_routes)

    with app.app_context():
        db.create_all()
    return app
