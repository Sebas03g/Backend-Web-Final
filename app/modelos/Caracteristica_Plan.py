from ..config.database import db
from sqlalchemy import Numeric

class Caracteristica_Plan(db.Model):
    __tablename__ = 'Caracteristica_Plan'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    valor = db.Column(Numeric(10,2), nullable = False)

    id_caracteristica = db.Column(db.Integer, db.ForeignKey('Caracteristica.id', ondelete='SET NULL'), nullable=True)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete='SET NULL'), nullable=True)

    caracteristica = db.relationship('Caracteristica', back_populates='caracteristicas_plan')
    plan = db.relationship('Plan', back_populates='caracteristicas_plan')

    __table_args__ = (
        db.UniqueConstraint('id_caracteristica', 'id_plan', name='uix_caracteristica_plan'),
    )

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "valor": float(self.valor),
            "id_caracteristica": self.id_caracteristica,
            "id_plan": self.id_plan,
            "caracteristica": self.caracteristica.to_dict() if self.caracteristica else None,
            "plan": self.plan.to_dict() if self.plan else None,
            "eliminado": self.eliminado,
        }


