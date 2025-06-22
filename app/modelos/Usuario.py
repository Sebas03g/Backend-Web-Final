from ..config.database import db
from .Caracteristica_Usuario import Caracteristica_Usuario
from .associations import usuario_tarjeta

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(150), nullable = False)
    correo_electronico = db.Column(db.String(150), nullable = False)
    telefono = db.Column(db.String(10), nullable = False)
    fecha_nacimiento = db.Column(db.DateTime, nullable = False)
    contrasena_hash = db.Column(db.String(150), nullable = False)
    monitoreo = db.Column(db.Boolean, nullable = False)
    es_monitoreo = db.Column(db.Boolean, nullable = False)

    transacciones = db.relationship("Transaccion", back_populates='usuario')
    caracteristicas_usuario = db.relationship("Caracteristica_Usuario", back_populates='usuario')
    tarjetas = db.relationship('Tarjeta', secondary=usuario_tarjeta, back_populates='usuarios')
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "fecha_nacimiento": self.fecha_nacimiento
        }