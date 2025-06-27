from ..config.database import db

class PersonaConfianza(db.Model):
    __tablename__ = 'persona_confianza'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    telefono = db.Column(db.String)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))
    imagen = db.Column(db.String)

    usuario = db.relationship('Usuario', back_populates='personas_confianza')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "descripcion": self.descripcion,
            "id_usuario": self.id_usuario,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "imagen": self.imagen
        }

