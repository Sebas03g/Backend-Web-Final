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
            db.session.refresh(objeto)
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error creando objeto: {str(e)}")

    def getAll(self):
        try:
            if hasattr(self.tipoObjeto, 'eliminado'):
                datos = self.tipoObjeto.query.filter_by(eliminado=False).all()
            else:
                datos = self.tipoObjeto.query.all()
            return datos
        except SQLAlchemyError as e:
            raise Exception(f"Error obteniendo todos los objetos: {str(e)}")

    def getById(self, id):
        try:
            query = self.tipoObjeto.query
            if hasattr(self.tipoObjeto, 'eliminado'):
                query = query.filter_by(eliminado=False)
            return query.filter_by(id=id).first()
        except SQLAlchemyError as e:
            raise Exception(f"Error obteniendo objeto por id: {str(e)}")

    def update(self, id, data):
        try:
            objeto = self.tipoObjeto.query.get(id)
            if not objeto or getattr(objeto, 'eliminado', False):
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
            if not objeto or getattr(objeto, 'eliminado', False):
                return None
            setattr(objeto, "eliminado", True)
            db.session.commit()
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error eliminando objeto: {str(e)}")
