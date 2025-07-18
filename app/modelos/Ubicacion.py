from ..config.database import db

class Ubicacion(db.Model):
    __tablename__ = 'Ubicacion'

    id = db.Column(db.Integer, primary_key=True)
    nombre_ubicacion = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    tipo = db.Column(db.String)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))
    id_punto = db.Column(db.Integer, db.ForeignKey('Punto.id'))

    usuario = db.relationship('Usuario', back_populates='ubicaciones_creadas')
    punto = db.relationship('Punto', back_populates='ubicaciones')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_ubicacion": self.nombre_ubicacion,
            "descripcion": self.descripcion,
            "tipo": self.tipo,
            "id_usuario": self.id_usuario,
            "id_punto": self.id_punto,
            "usuario": self.usuario.nombre_completo if self.usuario else None,
            "punto": f"{self.punto.lat},{self.punto.lng}" if self.punto else None,
            "eliminado": self.eliminado,
        }
