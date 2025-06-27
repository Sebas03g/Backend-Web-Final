from flask import Blueprint, render_template

main_routes = Blueprint('main', __name__)

@main_routes.route('/user-type')
def user_type():
    return render_template('seleccionTipo.html')

@main_routes.route('/admin-dashboard')
def admin_dashboard():
    return render_template('pagina-funcionalidad.html')

@main_routes.route('/user-dashboard')
def user_dashboard():
    return render_template('aplicacionMovil.html')

@main_routes.route('/account-dashboard')
def account_dashboard():
    return render_template('cuenta.html')