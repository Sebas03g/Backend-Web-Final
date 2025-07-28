from datetime import datetime, timedelta
from app.controller.RutaController import RutaController
from app.modelos.Ruta import Ruta
from app.repository.RutaRepo import RutaRepo
from app.validators.Ruta import RutaSchema

def limpiar_rutas_expiradas():
    controller = RutaController(Ruta, RutaRepo, RutaSchema)
    rutas = controller.getAll()
    
    for ruta in rutas:
        plan_id = getattr(ruta.usuario.plan, 'id', None)
        if plan_id is None or ruta.hora_fin is None:
            continue 

        horas = 24 if plan_id == 2 else 100
        expiracion = datetime.utcnow() - timedelta(hours=horas)

        if ruta.hora_fin < expiracion:
            controller.delete(ruta.id)
