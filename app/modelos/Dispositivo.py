from ..config.database import db

class Dispositivo(db.Model):
    __tablename__ = 'Dispositivo'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(150), nullable=False)
    correo_electronico = db.Column(db.String(150), nullable=False)
    telefono = db.Column(db.String(10), nullable=False)
    codigo = db.Column(db.String(15), nullable=False)

    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'))  # Usuario al que se asigna
    id_gestor = db.Column(db.Integer, db.ForeignKey('Usuario.id'))   # Usuario que lo gestiona

    permisos_usuario = db.relationship('PermisoUsuario', back_populates='dispositivo')

    usuario_asignado = db.relationship(
        'Usuario',
        back_populates='dispositivos_asignados',
        foreign_keys=[id_usuario]
    )

    gestor = db.relationship(
        'Usuario',
        back_populates='dispositivos_gestionados',
        foreign_keys=[id_gestor]
    )

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "codigo": self.codigo,
            "usuario_asignado": self.usuario_asignado.to_dict_resumido() if self.usuario_asignado else None,
            "gestor": self.gestor.to_dict_resumido() if self.gestor else None,
            "permisos_usuario": [p.to_dict() for p in self.permisos_usuario],
            
        }
