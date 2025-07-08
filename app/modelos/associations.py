from ..config.database import db

usuario_tarjeta = db.Table(
    'usuario_tarjeta',
    db.Column('usuario_id', db.Integer, db.ForeignKey('Usuario.id'), primary_key=True),
    db.Column('tarjeta_id', db.Integer, db.ForeignKey('Tarjeta.id'), primary_key=True)
)

ruta_punto = db.Table(
    'ruta_punto',
    db.Column('ruta_id', db.Integer, db.ForeignKey('Ruta.id'), primary_key=True),
    db.Column('punto_id', db.Integer, db.ForeignKey('Punto.id'), primary_key=True)
)