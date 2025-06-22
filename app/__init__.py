from flask import Flask
from app.config.database import create_db, db
from app.routes.PlanRoute import plan_routes
from app.routes.CaracteristicaRoute import caracteristica_routes
from app.routes.TarjetaRoute import tarjeta_routes
from app.routes.TransaccionRoute import transaccion_routes
from app.routes.UsuarioRoute import usuario_routes

def create_app():
    app = Flask(__name__)
    db = create_db(app)

    app.register_blueprint(plan_routes.get_blueprint())
    app.register_blueprint(caracteristica_routes.get_blueprint())
    app.register_blueprint(tarjeta_routes.get_blueprint())
    app.register_blueprint(transaccion_routes.get_blueprint())
    app.register_blueprint(usuario_routes.get_blueprint())

    with app.app_context():
        db.create_all()
    return app