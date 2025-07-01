from ..config.database import db
from sqlalchemy import Numeric

class Plan(db.Model):
    __tablename__ = 'Plan'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(150), nullable = False)
    descripcion = db.Column(db.String(500), nullable = False)
    precio = db.Column(Numeric(10, 2), nullable = False)

    transacciones = db.relationship("Transaccion", back_populates='plan')
    caracteristicas_plan = db.relationship("Caracteristica_Plan", back_populates="plan")

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": float(self.precio),
            "transacciones": [t.to_dict() for t in self.transacciones],
            "caracteristicas_plan": [c.to_dict() for c in self.caracteristicas_plan]
        }
