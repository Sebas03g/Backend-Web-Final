from ..config.database import db
from datetime import datetime

def nombre_por_defecto():
    return f"Ruta {datetime.now().time()}"

def descripcion_por_defecto():
    return f"Ruta iniciada {datetime.now().time()}"

def hora_inicio_default():
    return datetime.now().time()
class Ruta(db.Model):
    __tablename__ = 'Ruta'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String, nullable=True, default=nombre_por_defecto)
    descripcion = db.Column(db.Text, nullable=True, default=descripcion_por_defecto)
    hora_inicio = db.Column(db.Time, nullable=False, default=hora_inicio_default)
    hora_fin = db.Column(db.Time, nullable=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))

    usuario = db.relationship('Usuario', back_populates='rutas', foreign_keys=[id_usuario])
    ruta_puntos = db.relationship("RutaPunto", back_populates="ruta", cascade="all, delete-orphan")

    eliminado = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "id_usuario": self.id_usuario,
            "usuario": self.usuario.nombre_completo if self.usuario else None,
            "puntos": [rp.get_point() for rp in self.ruta_puntos if not rp.eliminado] if self.ruta_puntos else [],
            "eliminado": self.eliminado,
        }
    
    def to_dict_resumido(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "usuario": self.usuario.nombre_completo if self.usuario else None,
            "eliminado": self.eliminado,
        }