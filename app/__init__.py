from flask import Flask
from flask_jwt_extended import JWTManager
from app.config.database import create_db, db
from app.config.mail import create_mail
from app.routes.PlanRoute import plan_routes
from app.routes.RutaRoute import ruta_routes
from app.routes.PuntoRoute import punto_routes
from app.routes.CaracteristicaRoute import caracteristica_routes
from app.routes.CaracteristicaUsuarioRoute import caracteristica_usuario_routes
from app.routes.CaracteristicaPlanRoute import caracteristica_plan_routes
from app.routes.DispositivoRoute import dispositivo_routes
from app.routes.PermisoUsuarioRoute import permiso_usuario_routes
from app.routes.PersonaConfianzaRoute import permiso_confianza_routes
from app.routes.TarjetaRoute import tarjeta_routes
from app.routes.TransaccionRoute import transaccion_routes
from app.routes.UbicacionUsuarioRoute import ubicacion_usuario_routes
from app.routes.UbicacionRoute import ubicacion_routes
from app.routes.UsuarioRoute import usuario_routes
from app.routes.PermisoRoute import permiso_routes
from app.routes.TemplateRoutes import main_routes
from app.routes.MailRoute import mail_routes
from app.routes.CodigoRoutes import codigo_routes
from app.routes.authRoutes import auth
#from app.routes.UploadImageRoute import upload

from flask_mail import Mail

from flask_migrate import Migrate
mail = Mail()

def create_app():
    app = Flask(__name__)
    db = create_db(app)
    app.config['JWT_SECRET_KEY'] = 'clave-secreta-super-segura'
    jwt = JWTManager(app)
    mail = create_mail(app)

    app.register_blueprint(ubicacion_routes.get_blueprint())
    app.register_blueprint(punto_routes.get_blueprint())
    app.register_blueprint(plan_routes.get_blueprint())
    app.register_blueprint(ruta_routes.get_blueprint())
    app.register_blueprint(caracteristica_routes.get_blueprint())
    app.register_blueprint(caracteristica_plan_routes.get_blueprint())
    app.register_blueprint(tarjeta_routes.get_blueprint())
    app.register_blueprint(transaccion_routes.get_blueprint())
    app.register_blueprint(usuario_routes.get_blueprint())
    app.register_blueprint(caracteristica_usuario_routes.get_blueprint())
    app.register_blueprint(dispositivo_routes.get_blueprint())
    app.register_blueprint(permiso_routes.get_blueprint())
    app.register_blueprint(permiso_usuario_routes.get_blueprint())
    app.register_blueprint(permiso_confianza_routes.get_blueprint())
    app.register_blueprint(ubicacion_usuario_routes.get_blueprint())
    app.register_blueprint(main_routes)
    app.register_blueprint(mail_routes)
    app.register_blueprint(codigo_routes)
    app.register_blueprint(auth)

    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()
    return app