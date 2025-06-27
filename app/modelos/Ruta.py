from ..config.database import db

class Ruta(db.Model):
    __tablename__ = 'Ruta'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))

    usuario = db.relationship('Usuario', back_populates='rutas')
    puntos = db.relationship('Punto', back_populates='ruta')
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "id_usuario": self.id_usuario,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "puntos": [p.to_dict() for p in self.puntos]
        }


