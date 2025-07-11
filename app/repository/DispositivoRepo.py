from app.repository.BaseRepo import BaseRepo
from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class DispositivoRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)
    
    def assign(self, id, data):
        try:
            objeto = self.tipoObjeto.query.get(id)
            if not objeto:
                return None
            if not isinstance(data, dict):
                raise Exception('Datos invalidos para actualizacion.')
            for key, value in data.items():
                if hasattr(objeto, key):
                    setattr(objeto, key, value)
            db.session.commit()
            return objeto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error actualizando objeto: {str(e)}")


    