from ..config.database import db
from .associations import ruta_punto

class Punto(db.Model):
    __tablename__ = 'Punto'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    ruta_puntos = db.relationship("RutaPunto", back_populates="punto", cascade="all, delete-orphan")
    ubicaciones_usuario = db.relationship('UbicacionUsuario', back_populates='punto')
    ubicaciones = db.relationship('Ubicacion', back_populates='punto')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "lat": self.lat,
            "long": self.lng,
            "id_ruta": self.id_ruta,
            "ruta": self.id_ruta if self.id_ruta else None,
            "ubicaciones_usuario": [u.to_dict() for u in self.ubicaciones_usuario],
            "ubicaciones": [u.to_dict() for u in self.ubicaciones],
            "eliminado": self.eliminado,
        }
    def to_dict_resumido(self):
        return {
            "id": self.id,
            "lat": self.lat,
            "long": self.lng,
            "eliminado": self.eliminado,
        }

