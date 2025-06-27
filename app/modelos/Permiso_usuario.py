from ..config.database import db

class PermisoUsuario(db.Model):
    __tablename__ = 'Permiso_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_dispositivo = db.Column(db.Integer, db.ForeignKey('Dispositivo.id'), nullable=False)
    nivel = db.Column(db.Integer, nullable=False)

    dispositivo = db.relationship('Dispositivo', back_populates='permisos_usuario')
    permisos = db.relationship('Permiso', back_populates='permiso_usuario')

    def to_dict(self):
        return {
            "id": self.id,
            "id_dispositivo": self.id_dispositivo,
            "nivel": self.nivel,
            "dispositivo": self.dispositivo if self.dispositivo else None,
            "permisos": [permiso.to_dict() for permiso in self.permisos]
        }
