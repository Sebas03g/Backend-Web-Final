from app.config.database import db

class BaseRepo:

    def __init__(self, Objeto):
        self.tipoObjeto = Objeto

    def create(self, data):
        objeto = self.tipoObjeto(**data)
        db.session.add(objeto)
        db.session.commit()
        return objeto

    def getAll(self):
        return self.tipoObjeto.query.all()

    def getById(self, id):
        return self.tipoObjeto.query.get(id)

    def update(self, id, data):
        objeto = self.tipoObjeto.query.get(id)
        if objeto:
            for key, value in data.items():
                if hasattr(objeto, key):
                    setattr(objeto, key, value)
            db.session.commit()
        return objeto

    def delete(self, id):
        objeto = self.tipoObjeto.query.get(id)
        if objeto:
            db.session.delete(objeto)
            db.session.commit()
        return objeto
