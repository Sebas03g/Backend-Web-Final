from ..config.database import db
from .associations import usuario_tarjeta

class Tarjeta(db.Model):
    __tablename__ = 'Tarjeta'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    numero_tarjeta = db.Column(db.String(20), nullable = False)
    mes_expiracion = db.Column(db.Integer, nullable = False)
    anio_expiracion = db.Column(db.Integer, nullable = False)

    transacciones = db.relationship("Transaccion", backref='tarjeta')
    usuarios = db.relationship('Usuario', secondary=usuario_tarjeta, back_populates='tarjetas')