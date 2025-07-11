from app.controller.DispositivoController import DispositivoController
from app.modelos.Dispositivo import Dispositivo
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Dispositivo import DispositivoSchema

controller = DispositivoController(Dispositivo, BaseRepo, DispositivoSchema)
dispositivo_routes = BaseRoutes('dispositivo', controller)

bp = dispositivo_routes.get_blueprint()