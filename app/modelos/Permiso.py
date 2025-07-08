from ..config.database import db

class Permiso(db.Model):
    __tablename__ = 'Permiso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)
    id_permiso_usuario = db.Column(db.Integer, db.ForeignKey('Permiso_usuario.id'))

    permiso_usuario = db.relationship('PermisoUsuario', back_populates='permisos')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "id_permiso_usuario": self.id_permiso_usuario,
            "id_gestor_permiso": self.id_gestor_permiso,
            "gestor": {
                "id": self.gestor.id,
                "nombre_completo": self.gestor.nombre_completo
            } if self.gestor else None,
            "eliminado": self.eliminado,
        }
