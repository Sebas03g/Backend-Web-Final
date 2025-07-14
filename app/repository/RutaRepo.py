from app.repository.BaseRepo import BaseRepo
from app.modelos.Ruta_Punto import RutaPunto
from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class RutaRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)
    
    def assing_point(self, id_punto, id_ruta):
        try:
            rutaPunto = RutaPunto({"ruta_id": id_ruta, "punto_id": id_punto})
            return rutaPunto
        except SQLAlchemyError as e:
            raise Exception(f"Error buscando objeto por cordenadas: {str(e)}")