from ..config.database import db

class PersonaConfianza(db.Model):
    __tablename__ = 'persona_confianza'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String, nullable=False)
    telefono = db.Column(db.String)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))
    imagen = db.Column(db.String)

    usuario = db.relationship('Usuario', back_populates='personas_confianza')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "descripcion": self.descripcion,
            "id_usuario": self.id_usuario,
            "usuario": self.usuario.to_dict_resumido() if self.usuario else None,
            "imagen": self.imagen,
            "eliminado": self.eliminado,
        }

    def to_dict_resumido(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "descripcion": self.descripcion,
            "imagen": self.imagen,
        }

