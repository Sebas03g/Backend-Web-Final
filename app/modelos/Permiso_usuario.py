from ..config.database import db

class PermisoUsuario(db.Model):
    __tablename__ = 'permiso_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nivel = db.Column(db.Integer, nullable=False)

    usuario = db.relationship('Usuario', back_populates='permisos_usuario')
    permisos = db.relationship('Permiso', back_populates='permiso_usuario')

    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "nivel": self.nivel,
            "usuario": {
                "id": self.usuario.id,
                "nombre_completo": self.usuario.nombre_completo
            } if self.usuario else None,
            "permisos": [permiso.to_dict() for permiso in self.permisos]
        }
