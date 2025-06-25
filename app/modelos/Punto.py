from ..config.database import db

from . import db

class Punto(db.Model):
    __tablename__ = 'punto'

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    hora = db.Column(db.DateTime, nullable=False)
    id_ruta = db.Column(db.Integer, db.ForeignKey('ruta.id'))

    ruta = db.relationship('Ruta', back_populates='puntos')
    ubicaciones_usuario = db.relationship('UbicacionUsuario', back_populates='punto')
    ubicaciones = db.relationship('Ubicacion', back_populates='punto')
