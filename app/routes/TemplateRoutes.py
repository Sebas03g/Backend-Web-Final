from flask import Blueprint, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity

main_routes = Blueprint('main', __name__)

@main_routes.route('/user-type')
@jwt_required()
def user_type():
    return render_template('seleccionTipo.html')

@main_routes.route('/admin-dashboard')
@jwt_required()
def admin_dashboard():
    return render_template('pagina-funcionalidad.html')

@main_routes.route('/user-dashboard')
@jwt_required()
def user_dashboard():
    return render_template('aplicacionMovil.html')

@main_routes.route('/account-dashboard')
@jwt_required()
def account_dashboard():
    return render_template('cuenta.html')

@main_routes.route('/')
def login():
    return render_template('iniciar-sesion.html')

@main_routes.route('/sign-up')
def signup():
    return render_template('registrarse.html')

@main_routes.route('/password-recovery-email')
def password_recovery_email():
    return render_template('recuperar-contraseña-correo.html')

@main_routes.route('/password-recovery-code')
def password_recovery_code():
    return render_template('recuperar-contraseña-codigo.html')

@main_routes.route('/password-recovery-new')
def password_recovery_new():
    return render_template('recuperar-contraseña-nueva.html')

@main_routes.route('/home')
def home():
    return render_template('pagina-inicio.html')

@main_routes.route('/payment-dashboard')
def payment_dashoard():
    return render_template('metodos-pago.html')

@main_routes.route('/plan-dashboard')
def plan_dashboard():
    return render_template('planes.html')

@main_routes.route('/add-purchase')
def agregar_compra():
    return render_template('anadir-compra.html')

@main_routes.route('/plan-purchased/<int:id>')
def compra_realizada(id):
    match id:
        case 1:
            return render_template('planes-1.html')
        case 2:
            return render_template('planes-2.html')
        case 3:
            return render_template('planes-3.html')
        case _:
            return "Plan no encontrado", 404
