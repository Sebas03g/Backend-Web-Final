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

    def to_dict(self):
        return {
            "id": self.id,
            "numero_tarjeta": self.numero_tarjeta,
            "mes_expiracion": self.mes_expiracion,
            "anio_expiracion": self.anio_expiracion,
            "transacciones": [t.to_dict() for t in self.transacciones],
            "usuarios": [u.to_dict() for u in self.usuarios]
        }