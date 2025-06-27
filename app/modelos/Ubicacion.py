from ..config.database import db

class Ubicacion(db.Model):
    __tablename__ = 'Ubicacion'

    id = db.Column(db.Integer, primary_key=True)
    nombre_ubicacion = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    tipo = db.Column(db.String)
    nivel = db.Column(db.Integer)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))
    id_punto = db.Column(db.Integer, db.ForeignKey('Punto.id'))

    usuario = db.relationship('Usuario', back_populates='ubicaciones_creadas')
    punto = db.relationship('Punto', back_populates='ubicaciones')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_ubicacion": self.nombre_ubicacion,
            "descripcion": self.descripcion,
            "tipo": self.tipo,
            "nivel": self.nivel,
            "id_usuario": self.id_usuario,
            "id_punto": self.id_punto,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "punto": self.punto.to_dict() if self.punto else None
        }
