import os
from flask import abort, Blueprint, send_from_directory

pwa_routes = Blueprint('pwa', __name__)

@pwa_routes.route('/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js')

@pwa_routes.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

@pwa_routes.route('/ubicacionActual.js')
def ubicacion_actual():
    return send_from_directory('static/js/general', 'ubicacionActual.js')

@pwa_routes.route('/datosContenedor.css')
def datos_contenedor():
    return send_from_directory('static/css/aplicacionMovil', 'datosContenedor.css')

@pwa_routes.route('/cuerpo.css')
def cuerpo():
    return send_from_directory('static/css/aplicacionMovil', 'cuerpo.css')

@pwa_routes.route('/contenedores.css')
def contenedores():
    return send_from_directory('static/css/aplicacionMovil', 'contenedores.css')

@pwa_routes.route('/setUpPWA.js')
def setUpPWA():
    return send_from_directory('static/js/general', 'setUpPWA.js')
