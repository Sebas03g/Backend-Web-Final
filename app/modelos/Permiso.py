from ..config.database import db

class Permiso(db.Model):
    __tablename__ = 'Permiso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.Text)

    permisos_usuario = db.relationship('PermisoUsuario', back_populates='permiso')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "permisos_usuario": [pu.to_dict() for pu in self.permisos_usuario],
            "eliminado": self.eliminado,
        }
