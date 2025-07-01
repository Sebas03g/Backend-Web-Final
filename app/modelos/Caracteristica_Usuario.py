from ..config.database import db
from sqlalchemy import Numeric

class Caracteristica_Usuario(db.Model):
    __tablename__ = 'Caracteristica_Usuario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    valor = db.Column(Numeric(10,2), nullable=False)

    id_caracteristica = db.Column(db.Integer, db.ForeignKey('Caracteristica.id', ondelete='SET NULL'), nullable=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id', ondelete='SET NULL'), nullable=True)
    id_transaccion = db.Column(db.Integer, db.ForeignKey('Transaccion.id', ondelete='SET NULL'), nullable=True)

    caracteristica = db.relationship('Caracteristica', back_populates='caracteristicas_usuario')
    usuario = db.relationship('Usuario', back_populates='caracteristicas_usuario')
    transaccion = db.relationship('Transaccion', back_populates='caracteristicas_usuario')

    __table_args__ = (
        db.UniqueConstraint('id_caracteristica', 'id_usuario', name='uix_caracteristica_usuario'),
    )

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "valor": float(self.valor),
            "id_caracteristica": self.id_caracteristica,
            "id_usuario": self.id_usuario,
            "id_transaccion": self.id_transaccion,
            "caracteristica": self.caracteristica.to_dict() if self.caracteristica else None,
            "usuario": self.usuario.to_dict() if self.usuario else None,
            "transaccion": self.transaccion.to_dict() if self.transaccion else None
        }

