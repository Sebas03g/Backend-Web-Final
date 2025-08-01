from ..config.database import db

from datetime import datetime

class UbicacionUsuario(db.Model):
    __tablename__ = 'Ubicacion_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'), nullable=False, unique=True)
    id_punto = db.Column(db.Integer, db.ForeignKey('Punto.id'), nullable=True)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    usuario = db.relationship('Usuario', back_populates='ubicacion')
    punto = db.relationship('Punto', back_populates='ubicaciones_usuario')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_punto": self.id_punto,
            "fecha": self.fecha,
            "usuario": self.usuario.nombre_completo if self.usuario else None,
            "punto": f"{self.punto.lat},{self.punto.lng}" if self.punto else None,
            "eliminado": self.eliminado,
        }
