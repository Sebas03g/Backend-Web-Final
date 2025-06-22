from ..config.database import db
from sqlalchemy import Numeric

class Caracteristica(db.Model):
    __tablename__ = 'Caracteristica'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(150), nullable = False)
    descripcion = db.Column(db.String(500), nullable = False)
    unidad_valor = db.Column(db.String(150), nullable = False)
    valor = db.Column(Numeric(10,2), nullable = False)

    caracteristicas_usuario = db.relationship("Caracteristica_Usuario", back_populates='caracteristica')
    caracteristicas_plan = db.relationship("Caracteristica_Plan", back_populates='caracteristica')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "unidad_valor": self.unidad_valor,
            "valor": self.valor,
        }
