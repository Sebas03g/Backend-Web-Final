from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class BaseRepo:

    def __init__(self, Objeto):
        self.tipoObjeto = Objeto

    def create(self, data):
        try:
            objeto = self.tipoObjeto(**data)
            db.session.add(objeto)
            db.session.commit()
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error creando objeto: {str(e)}")

    def getAll(self):
        try:
            return self.tipoObjeto.query.all()
        except SQLAlchemyError as e:
            raise Exception(f"Error obteniendo todos los objetos: {str(e)}")

    def getById(self, id):
        try:
            return self.tipoObjeto.query.get(id)
        except SQLAlchemyError as e:
            raise Exception(f"Error obteniendo objeto por id: {str(e)}")

    def update(self, id, data):
        try:
            objeto = self.tipoObjeto.query.get(id)
            if not objeto:
                return None
            if not isinstance(data, dict):
                raise Exception("Datos inválidos para actualizar")
            for key, value in data.items():
                if hasattr(objeto, key):
                    setattr(objeto, key, value)
            db.session.commit()
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error actualizando objeto: {str(e)}")

    def delete(self, id):
        try:
            objeto = self.tipoObjeto.query.get(id)
            if not objeto:
                return None
            db.session.delete(objeto)
            db.session.commit()
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error eliminando objeto: {str(e)}")
