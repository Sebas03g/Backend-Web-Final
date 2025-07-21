from flask import Blueprint
from app.controller.PermisoUsuarioController import PermisoUsuarioController
from app.modelos.Permiso_usuario import PermisoUsuario
from app.repository.BaseRepo import BaseRepo
from app.routes.BaseRoutes import BaseRoutes
from app.validators.Permiso_usuario import PermisoUsuarioSchema

controller = PermisoUsuarioController(PermisoUsuario, BaseRepo, PermisoUsuarioSchema)
permiso_usuario_routes = BaseRoutes('permiso-usuario', controller)

permiso_usuario_routes.agregar_ruta_personalizada("/modify-state/<int:id>", "POST", controller.modifyAllState)

bp = permiso_usuario_routes.get_blueprint()