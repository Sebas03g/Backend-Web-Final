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
from app.routes.TransaccionRoute import transaccion_routes
from app.routes.UbicacionUsuarioRoute import ubicacion_usuario_routes
from app.routes.UbicacionRoute import ubicacion_routes
from app.routes.UsuarioRoute import usuario_routes
from app.routes.PermisoRoute import permiso_routes
from app.routes.TemplateRoutes import main_routes
from app.routes.MailRoute import mail_routes
from app.routes.CodigoRoutes import codigo_routes
from app.routes.authRoutes import auth
from app.routes.UserNotificationRoutes import notify
from app.routes.ImageRoute import image_routes
from app.routes.PayPalRoutes import paypal_routes
from app.routes.PWARoutes import pwa_routes
from app.modelos.Ruta_Punto import RutaPunto
from flask_mail import Mail
from flask_cors import CORS
from flask_talisman import Talisman

from flask_migrate import Migrate
mail = Mail()

def create_app():
    app = Flask(__name__)

    app.secret_key = "RANDOM"
    db = create_db(app)
    CORS(app)
    from flask_talisman import Talisman

    talisman = Talisman(app, content_security_policy={
        'default-src': "'self'",
        'connect-src': "'self' *",
        'style-src': "'self' https://cdn.jsdelivr.net https://unpkg.com https://fonts.googleapis.com 'unsafe-inline'",
        'script-src': "'self' https://cdn.jsdelivr.net https://code.jquery.com https://unpkg.com",
        'font-src': "'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        'img-src': "'self' data: http://localhost:5000/ https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org http://www.w3.org/2000/svg",
    })


    app.config['JWT_SECRET_KEY'] = 'clave-secreta-super-segura'
    jwt = JWTManager(app)
    mail = create_mail(app)

    app.register_blueprint(ubicacion_routes.get_blueprint())
    app.register_blueprint(punto_routes.get_blueprint())
    app.register_blueprint(plan_routes.get_blueprint())
    app.register_blueprint(ruta_routes.get_blueprint())
    app.register_blueprint(caracteristica_routes.get_blueprint())
    app.register_blueprint(caracteristica_plan_routes.get_blueprint())
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
    app.register_blueprint(notify)
    app.register_blueprint(image_routes)
    app.register_blueprint(paypal_routes)
    app.register_blueprint(pwa_routes)

    migrate = Migrate(app, db)

    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_SECURE"] = False
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False 

    from sqlalchemy import text

    with app.app_context():
        #db.session.execute(text("DROP SCHEMA public CASCADE"))
        #db.session.execute(text("CREATE SCHEMA public"))
        #db.session.execute(text("GRANT ALL ON SCHEMA public TO postgres"))
        #db.session.execute(text("GRANT ALL ON SCHEMA public TO public"))
        #db.session.commit()

        db.create_all()

    return app