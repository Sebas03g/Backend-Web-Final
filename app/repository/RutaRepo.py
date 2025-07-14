from app.repository.BaseRepo import BaseRepo
from app.modelos.Ruta_Punto import RutaPunto
from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class RutaRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)

    def assing_point(self, id_punto, id_ruta):
        try:
            ruta_punto = RutaPunto(
                ruta_id=id_ruta,
                punto_id=id_punto
            )
            db.session.add(ruta_punto)
            db.session.commit()
            return ruta_punto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error asignando punto a ruta: {str(e)}")
