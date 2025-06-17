from ..config.database import db
from sqlalchemy import Numeric

class Plan(db.Model):
    __tablename__ = 'Plan'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(150), nullable = False)
    descripcion = db.Column(db.String(500), nullable = False)
    precio = db.Column(Numeric(10, 2), nullable = False)

    transacciones = db.relationship("Transaccion", backref='plan')
    caracteristicas = db.relationship("Catarestica_Plan", backref="plan")