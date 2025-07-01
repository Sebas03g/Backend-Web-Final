from ..config.database import db

class Punto(db.Model):
    __tablename__ = 'Punto'

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    hora = db.Column(db.DateTime, nullable=True)
    id_ruta = db.Column(db.Integer, db.ForeignKey('Ruta.id'), nullable=True)

    ruta = db.relationship('Ruta', back_populates='puntos')
    ubicaciones_usuario = db.relationship('UbicacionUsuario', back_populates='punto')
    ubicaciones = db.relationship('Ubicacion', back_populates='punto')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "lat": self.lat,
            "long": self.long,
            "hora": self.hora.isoformat() if self.hora else None,
            "id_ruta": self.id_ruta,
            "ruta": self.ruta.to_dict() if self.ruta else None,
            "ubicaciones_usuario": [u.to_dict() for u in self.ubicaciones_usuario],
            "ubicaciones": [u.to_dict() for u in self.ubicaciones]
        }

