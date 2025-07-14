from app.repository.BaseRepo import BaseRepo
from app.config.database import db
from sqlalchemy.exc import SQLAlchemyError

class PuntoRepo(BaseRepo):
    def __init__(self, ModeloPunto):
        super().__init__(ModeloPunto)
    
    def create(self, data):
        try:
            if "lat" not in data or "lng" not in data:
                raise ValueError("Faltan coordenadas: 'lat' y 'lng' son requeridos")

            existente = self.getByCords(data)
            if existente:
                return existente

            nuevo_punto = self.tipoObjeto(**data)
            db.session.add(nuevo_punto)
            db.session.commit()
            db.session.refresh(nuevo_punto)
            return nuevo_punto
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error creando punto: {str(e)}")
        except Exception as e:
            raise Exception(f"Error en datos: {str(e)}")

    def getByCords(self, data):
        try:
            return self.tipoObjeto.query.filter_by(lat=data["lat"], lng=data["lng"]).first()
        except SQLAlchemyError as e:
            raise Exception(f"Error buscando punto por coordenadas: {str(e)}")
