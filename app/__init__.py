from flask import Flask
from dotenv import load_dotenv
import os
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
from flask_socketio import SocketIO
from flask_migrate import Migrate

load_dotenv()
mail = Mail()
socketio_app = SocketIO(cors_allowed_origins="*")

def create_app():
    flask_app = Flask(__name__)

    flask_app.secret_key = "RANDOM"
    db = create_db(flask_app)
    CORS(flask_app,origins=["https://localhost:5000","https://127.0.0.1:5000"])

    socketio_app.init_app(flask_app)

    talisman = Talisman(flask_app, content_security_policy={
        'default-src': "'self'",
        'connect-src': "'self' *",
        'style-src': "'self' https://cdn.jsdelivr.net https://unpkg.com https://fonts.googleapis.com 'unsafe-inline'",
        'script-src': "'self' https://cdn.jsdelivr.net https://code.jquery.com https://unpkg.com https://cdn.socket.io",
        'font-src': "'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        'img-src': "'self' data: http://localhost:5000/ https://unpkg.com/ https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org http://www.w3.org/2000/svg",
    })


    flask_app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    flask_app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    flask_app.config["JWT_COOKIE_SECURE"] = False
    flask_app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    jwt = JWTManager(flask_app)
    mail = create_mail(flask_app)

    flask_app.register_blueprint(ubicacion_routes.get_blueprint())
    flask_app.register_blueprint(punto_routes.get_blueprint())
    flask_app.register_blueprint(plan_routes.get_blueprint())
    flask_app.register_blueprint(ruta_routes.get_blueprint())
    flask_app.register_blueprint(caracteristica_routes.get_blueprint())
    flask_app.register_blueprint(caracteristica_plan_routes.get_blueprint())
    flask_app.register_blueprint(transaccion_routes.get_blueprint())
    flask_app.register_blueprint(usuario_routes.get_blueprint())
    flask_app.register_blueprint(caracteristica_usuario_routes.get_blueprint())
    flask_app.register_blueprint(dispositivo_routes.get_blueprint())
    flask_app.register_blueprint(permiso_routes.get_blueprint())
    flask_app.register_blueprint(permiso_usuario_routes.get_blueprint())
    flask_app.register_blueprint(permiso_confianza_routes.get_blueprint())
    flask_app.register_blueprint(ubicacion_usuario_routes.get_blueprint())
    flask_app.register_blueprint(main_routes)
    flask_app.register_blueprint(mail_routes)
    flask_app.register_blueprint(codigo_routes)
    flask_app.register_blueprint(auth)
    flask_app.register_blueprint(notify)
    flask_app.register_blueprint(image_routes)
    flask_app.register_blueprint(paypal_routes)
    flask_app.register_blueprint(pwa_routes)

    migrate = Migrate(flask_app, db)


    from sqlalchemy import text

    with flask_app.app_context():
        #db.session.execute(text("DROP SCHEMA public CASCADE"))
        #db.session.execute(text("CREATE SCHEMA public"))
        #db.session.execute(text("GRANT ALL ON SCHEMA public TO postgres"))
        #db.session.execute(text("GRANT ALL ON SCHEMA public TO public"))
        #db.session.commit()

        db.create_all()
    
    import app.socket_events.Ubicacion_event
    import app.socket_events.Modo_alerta
    import app.socket_events.Permisos_event

    return flask_app