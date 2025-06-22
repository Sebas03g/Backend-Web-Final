from flask import Flask
from app.config.database import db
from app.routes.PlanRoute import plan_routes
from app.routes.CaracteristicaRoute import caracteristica_routes
from app.routes.TarjetaRoute import tarjeta_routes
from app.routes.TransaccionRoute import transaccion_routes
from app.routes.UsuarioRoute import usuario_routes

def create_app():
    app = Flask(__name__)

    app.register_blueprint(plan_routes)
    app.register_blueprint(caracteristica_routes)
    app.register_blueprint(tarjeta_routes)
    app.register_blueprint(transaccion_routes)
    app.register_blueprint(usuario_routes)

    with app.app_context():
        db.create_all()
    return app
