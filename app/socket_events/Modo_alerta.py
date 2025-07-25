from flask_socketio import emit
from app import socketio_app
from app.controller.LostModeController import LostModeController
from app.config.database import db

controller = LostModeController()

@socketio_app.on('activar_modo_alerta')
def handle_ubicacion(data):
    try:
        print(data)
        id_usuario = data['id_usuario']

        controller.activate(id_usuario)
        emit('modo_perdida', {
                'id': id_usuario,
        }, broadcast=True)
    except Exception as e:
        print("Error al manejar modo perdida:", e)
        emit('modo_perdida_error', {'mensaje': 'Error al actualizar modo de perdida'})
