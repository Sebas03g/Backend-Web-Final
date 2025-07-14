from ..config.database import db
from .associations import ruta_punto

class Ruta(db.Model):
    __tablename__ = 'Ruta'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))

    usuario = db.relationship('Usuario', back_populates='rutas')
    ruta_puntos = db.relationship("RutaPunto", back_populates="ruta", cascade="all, delete-orphan")

    eliminado = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "id_usuario": self.id_usuario,
            "usuario": self.usuario.nombre_completo if self.usuario else None,
            "puntos": [rp.get_point() for rp in self.ruta_puntos],
            "eliminado": self.eliminado,
        }


