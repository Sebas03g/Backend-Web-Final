from app.repository.BaseRepo import BaseRepo
from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class PuntoRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)
    
    def getByCords(self, data):
        try:
            objeto = self.tipoObjeto.query.filter_by(lat=data["lat"], lng=data["lng"]).first()
            if objeto:
                return objeto
            return None
        except SQLAlchemyError as e:
            raise Exception(f"Error buscando objeto por cordenadas: {str(e)}")