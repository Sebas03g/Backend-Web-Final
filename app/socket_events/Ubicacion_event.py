from flask_socketio import emit
from app import socketio_app
from app.modelos.Ubicacion_usuario import UbicacionUsuario
from app.controller.UbicacionUsuarioController import UbicacionUsuarioController
from app.config.database import db
from app.repository.BaseRepo import BaseRepo
from app.repository.PuntoRepo import PuntoRepo
from app.repository.RutaRepo import RutaRepo
from app.validators.Ubicacion_usuario import UbicacionUsuarioSchema

controller = UbicacionUsuarioController(
    UbicacionUsuario,
    BaseRepo,
    UbicacionUsuarioSchema,
    PuntoRepo,
    RutaRepo
)

@socketio_app.on('actualizar_ubicacion')
def handle_ubicacion(data):
    try:
        id_ubicacion = data['id_ubicacion']
        lat = data["lat"]
        lng = data["lng"]

        data_punto = {"lat": lat, "lng": lng}
        controller.updatePoint(id_ubicacion, data_punto)

        # Puedes evitar esta consulta si no necesitas el nombre
        ubicacion = controller.getById(id_ubicacion)
        if ubicacion:
            emit('ubicacion_actualizada', {
                'id': ubicacion.id,
                'lat': lat,
                'lng': lng,
                'nombre': getattr(ubicacion, "nombre", "")
            }, broadcast=True)
    except Exception as e:
        print("Error al manejar ubicacion:", e)
        emit('ubicacion_error', {'mensaje': 'Error al actualizar ubicación'})
