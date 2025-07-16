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