from ..config.database import db
import datetime

class Transaccion(db.Model):
    __tablename__ = 'Transaccion'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha = db.Column(db.DateTime, nullable=False, default = datetime.datetime.now)

    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id', ondelete='SET NULL'), nullable=True)
    id_tarjeta = db.Column(db.Integer, db.ForeignKey('Tarjeta.id', ondelete='SET NULL'), nullable=True)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete='SET NULL'), nullable=True)

    usuario = db.relationship('Usuario', back_populates='transacciones')  # <-- Aquí la relación
    plan = db.relationship('Plan', back_populates="transacciones")
    tarjeta = db.relationship('Tarjeta', back_populates='transacciones')

    caracteristicas_usuario = db.relationship('Caracteristica_Usuario', back_populates='transaccion')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_tarjeta": self.id_tarjeta,
            "id_plan": self.id_plan,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict_resumido() if self.usuario else None,
            "caracteristicas_usuario": [c.to_dict_resumido() for c in self.caracteristicas_usuario],
            "eliminado": self.eliminado,
        }

    def to_dict_resumido(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_tarjeta": self.id_tarjeta,
            "id_plan": self.id_plan,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict_resumido() if self.usuario else None,
            "eliminado": self.eliminado,
        }
