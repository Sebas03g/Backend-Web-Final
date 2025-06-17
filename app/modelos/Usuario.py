from ..config.database import db
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

    transacciones = db.relationship("Transaccion", backref='usuario')
    caracteristicas = db.relationship("Caracteristica_Usuario", backref='usuario')
    tarjetas = db.relationship('Tarjeta', secondary=usuario_tarjeta, back_populates='usuarios')
    