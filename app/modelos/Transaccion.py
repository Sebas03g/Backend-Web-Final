from ..config.database import db

class Transaccion(db.Model):
    __tablename__ = 'Transaccion'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha = db.Column(db.DateTime, nullable=False)

    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id', ondelete='SET NULL'), nullable=True)
    id_tarjeta = db.Column(db.Integer, db.ForeignKey('Tarjeta.id', ondelete='SET NULL'), nullable=True)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete='SET NULL'), nullable=True)

    usuario = db.relationship('Usuario', back_populates='transacciones')  # <-- Aquí la relación

    caracteristicas_usuario = db.relationship('Caracteristica_Usuario', back_populates='transaccion')

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_tarjeta": self.id_tarjeta,
            "id_plan": self.id_plan,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "caracteristicas_usuario": [c.to_dict() for c in self.caracteristicas_usuario],
        }
