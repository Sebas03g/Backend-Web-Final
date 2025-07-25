from flask_socketio import emit
from app import socketio_app
from app.controller.DispositivoController import DispositivoController
from app.modelos.Dispositivo import Dispositivo
from app.validators.Dispositivo import DispositivoSchema
from app.repository.DispositivoRepo import DispositivoRepo
from app.repository.BaseRepo import BaseRepo

controller = DispositivoController(
    Dispositivo, DispositivoRepo, 
    BaseRepo, DispositivoSchema
    )


@socketio_app.on('modify-permission')
def handle_permiso(data):
    try:
        print("BACKEND recibió modify-permission:", data)
        emit('permiso_modificado', {
            "id": data["id_dispositivo"],
            "tipo": data["tipo"]
        }, broadcast=True)
    except Exception as e:
        print("Error al modificar permisos del dispositivo", e)

@socketio_app.on('state-user')
def handle_dispositivo(data):
    try:
        print(data)
        if 'codigo' in data:
            response, status = controller.user_acceptance(data['codigo'])
            data = response.get_json()
            print(data)
            id = data["id"]
        else:
            controller.modificarEstado(data['id_dispositivo'])
            id = data['id_dispositivo']
        emit('dispositivo_estado', {
            "id_dispositivo": id
        }, broadcast=True)
    except Exception as e:
        print("Error al modificar estado del dispositivo", e)