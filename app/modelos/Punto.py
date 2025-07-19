from ..config.database import db

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
            "rutas": [ruta.get_ruta() for ruta in self.ruta_puntos if not ruta.eliminado] if self.ruta_puntos else [],
            "ubicaciones_usuario": [u.to_dict() for u in self.ubicaciones_usuario if not u.eliminado] if self.ubicaciones_usuario else [],
            "ubicaciones": [u.to_dict() for u in self.ubicaciones if not u.eliminado] if self.ubicaciones else [],
            "eliminado": self.eliminado,
        }
    def to_dict_resumido(self):
        return {
            "id": self.id,
            "lat": self.lat,
            "long": self.lng,
            "eliminado": self.eliminado,
        }

