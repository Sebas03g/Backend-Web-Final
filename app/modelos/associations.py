from ..config.database import db

usuario_tarjeta = db.Table(
    'usuario_tarjeta',
    db.Column('usuario_id', db.Integer, db.ForeignKey('Usuario.id'), primary_key=True),
    db.Column('tarjeta_id', db.Integer, db.ForeignKey('Tarjeta.id'), primary_key=True)
)

transaccion_plan = db.Table(
    'transaccion_plan',
    db.Column('transaccion_id', db.Integer, db.ForeignKey('Transaccion.id'), primary_key=True),
    db.Column('plan_id', db.Integer, db.ForeignKey('Plan.id'), primary_key=True)
)
