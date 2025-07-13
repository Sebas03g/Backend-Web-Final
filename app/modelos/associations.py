from ..config.database import db

ruta_punto = db.Table(
    'ruta_punto',
    db.Column('ruta_id', db.Integer, db.ForeignKey('Ruta.id'), primary_key=True),
    db.Column('punto_id', db.Integer, db.ForeignKey('Punto.id'), primary_key=True)
)