from ..config.database import db

class Ruta(db.Model):
    __tablename__ = 'ruta'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))

    usuario = db.relationship('Usuario', back_populates='rutas')
    puntos = db.relationship('Punto', back_populates='ruta')