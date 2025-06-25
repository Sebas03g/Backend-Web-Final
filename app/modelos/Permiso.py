from ..config.database import db

class Permiso(db.Model):
    __tablename__ = 'permiso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    id_permiso_usuario = db.Column(db.Integer, db.ForeignKey('permiso_usuario.id'))
    id_gestor_permiso = db.Column(db.Integer, db.ForeignKey('usuario.id'))

    permiso_usuario = db.relationship('PermisoUsuario', back_populates='permisos')
    gestor = db.relationship('Usuario', back_populates='permisos_gestionados')