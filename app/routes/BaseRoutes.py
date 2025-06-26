from flask import Blueprint

class BaseRoutes:
    def __init__(self, name, controller, url_prefix=None):
        self.bp = Blueprint(name, __name__, url_prefix=url_prefix or f'/{name}')
        self.controller = controller

        self.bp.add_url_rule('/', methods=['POST'], view_func=self.controller.create)
        self.bp.add_url_rule('/', methods=['GET'], view_func=self.controller.getAll)
        self.bp.add_url_rule('/<int:id>', methods=['GET'], view_func=self.controller.getById)
        self.bp.add_url_rule('/<int:id>', methods=['PUT'], view_func=self.controller.update)
        self.bp.add_url_rule('/<int:id>', methods=['DELETE'], view_func=self.controller.delete)

    def agregar_ruta_personalizada(self, url, methods, funcion):
        if isinstance(methods, str):
            methods = [methods]
        self.bp.add_url_rule(url, methods=methods, view_func=funcion)


    def get_blueprint(self):
        return self.bp