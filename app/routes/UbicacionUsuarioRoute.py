from flask import Blueprint
from app.controller.UbicacionUsuarioController import UbicacionUsuarioController
from app.modelos.Ubicacion_usuario import UbicacionUsuario
from app.repository.BaseRepo import BaseRepo
from app.repository.PuntoRepo import PuntoRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Ubicacion_usuario import UbicacionUsuarioSchema

controller = UbicacionUsuarioController(UbicacionUsuario, BaseRepo, UbicacionUsuarioSchema, PuntoRepo)
ubicacion_usuario_routes = BaseRoutes('ubicacion-usuario', controller)

ubicacion_usuario_routes.agregar_ruta_personalizada('/update-point/<int:id>', 'POST', controller.updatePoint)

bp = ubicacion_usuario_routes.get_blueprint()