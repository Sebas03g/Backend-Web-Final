from ..config.database import db

class UbicacionUsuario(db.Model):
    __tablename__ = 'ubicacion_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_punto = db.Column(db.Integer, db.ForeignKey('punto.id'), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)

    usuario = db.relationship('Usuario', back_populates='ubicaciones')
    punto = db.relationship('Punto', back_populates='ubicaciones_usuario')