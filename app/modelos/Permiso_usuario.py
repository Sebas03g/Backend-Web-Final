from ..config.database import db

class PermisoUsuario(db.Model):
    __tablename__ = 'Permiso_usuario'

    id = db.Column(db.Integer, primary_key=True)
    id_dispositivo = db.Column(db.Integer, db.ForeignKey('Dispositivo.id'), nullable=False)
    id_permiso = db.Column(db.Integer, db.ForeignKey('Permiso.id'), nullable=False)
    nivel = db.Column(db.Integer, nullable=False)

    dispositivo = db.relationship('Dispositivo', back_populates='permisos_usuario')
    permiso = db.relationship('Permiso', back_populates='permisos_usuario')

    eliminado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "id_dispositivo": self.id_dispositivo,
            "nivel": self.nivel,
            "dispositivo": self.dispositivo.codigo if self.dispositivo else None,
            "permiso": self.permiso.to_dict_resumido() if self.permiso else None,
            "eliminado": self.eliminado,
        }
    
