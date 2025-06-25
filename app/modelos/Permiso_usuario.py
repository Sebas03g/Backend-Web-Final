from ..config.database import db

class PermisoUsuario(db.Model):
    __tablename__ = 'permiso_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nivel = db.Column(db.Integer, nullable=False)

    usuario = db.relationship('Usuario', back_populates='permisos_usuario')
    permisos = db.relationship('Permiso', back_populates='permiso_usuario')