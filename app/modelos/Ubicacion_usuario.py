from ..config.database import db

class UbicacionUsuario(db.Model):
    __tablename__ = 'Ubicacion_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'), nullable=False)
    id_punto = db.Column(db.Integer, db.ForeignKey('Punto.id'), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)

    usuario = db.relationship('Usuario', back_populates='ubicaciones')
    punto = db.relationship('Punto', back_populates='ubicaciones_usuario')

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_punto": self.id_punto,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "punto": self.punto.to_dict() if self.punto else None
        }
