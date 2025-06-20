from ..config.database import db

class Transaccion(db.Model):
    __tablename__ = 'Transaccion'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha = db.Column(db.DateTime, nullable = False)

    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id', ondelete = "SET NULL"), nullable=True)
    id_tarjeta = db.Column(db.Integer, db.ForeignKey('Tarjeta.id', ondelete = "SET NULL"), nullable=True)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete = "SET NULL"), nullable=True)

    caracteristicas_usuario = db.relationship('Caracteristica_Usuario', backref='transaccion')

    def to_dict(self):
        return {
            "id": self.id,
            "fecha": self.fecha
        }