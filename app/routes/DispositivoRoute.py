from app.controller.DispositivoController import DispositivoController
from app.modelos.Dispositivo import Dispositivo
from app.repository.BaseRepo import BaseRepo
from app.repository.DispositivoRepo import DispositivoRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Dispositivo import DispositivoSchema

controller = DispositivoController(Dispositivo, DispositivoRepo, BaseRepo, DispositivoSchema)
dispositivo_routes = BaseRoutes('dispositivo', controller)

dispositivo_routes.agregar_ruta_personalizada("/add-device/<string:codigo>","PUT", controller.user_acceptance)
dispositivo_routes.agregar_ruta_personalizada("/modify-state/<int:id>","PUT", controller.modificarEstado)

bp = dispositivo_routes.get_blueprint()