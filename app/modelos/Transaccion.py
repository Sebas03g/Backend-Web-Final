from ..config.database import db
import datetime

class Transaccion(db.Model):
    __tablename__ = 'Transaccion'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha = db.Column(db.DateTime, nullable=False, default = datetime.datetime.now)
    order_id = db.Column(db.Text, nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id', ondelete='SET NULL'), nullable=False)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete='SET NULL'), nullable=True)

    usuario = db.relationship('Usuario', back_populates='transacciones')  # <-- Aquí la relación
    plan = db.relationship('Plan', back_populates="transacciones")

    caracteristicas_usuario = db.relationship('Caracteristica_Usuario', back_populates='transaccion')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_plan": self.id_plan,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict_resumido() if self.usuario else None,
            "caracteristicas_usuario": [c.to_dict_resumido() for c in self.caracteristicas_usuario] if self.caracteristicas_usuario else [],
            "eliminado": self.eliminado,
        }

    def to_dict_resumido(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_plan": self.id_plan,
            "fecha": self.fecha,
            "usuario": self.usuario.to_dict_resumido() if self.usuario else None,
            "eliminado": self.eliminado,
        }
