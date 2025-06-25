from ..config.database import db

class Ubicacion(db.Model):
    __tablename__ = 'ubicacion'

    id = db.Column(db.Integer, primary_key=True)
    nombre_ubicacion = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    tipo = db.Column(db.String)
    nivel = db.Column(db.Integer)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    id_punto = db.Column(db.Integer, db.ForeignKey('punto.id'))

    usuario = db.relationship('Usuario', back_populates='ubicaciones_creadas')
    punto = db.relationship('Punto', back_populates='ubicaciones')