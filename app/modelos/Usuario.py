from ..config.database import db
from .Caracteristica_Usuario import Caracteristica_Usuario
from .associations import usuario_tarjeta

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(150), nullable=False)
    correo_electronico = db.Column(db.String(150), nullable=False)
    telefono = db.Column(db.String(10), nullable=False)
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    contrasena_hash = db.Column(db.String(150), nullable=False)
    monitoreo = db.Column(db.Boolean, nullable=False)
    es_monitoreo = db.Column(db.Boolean, nullable=False)

    transacciones = db.relationship("Transaccion", back_populates='usuario')
    caracteristicas_usuario = db.relationship("Caracteristica_Usuario", back_populates='usuario')
    tarjetas = db.relationship('Tarjeta', secondary=usuario_tarjeta, back_populates='usuarios')
    ubicaciones = db.relationship('UbicacionUsuario', back_populates='usuario')
    ubicaciones_creadas = db.relationship('Ubicacion', back_populates='usuario')
    rutas = db.relationship('Ruta', back_populates='usuario')
    personas_confianza = db.relationship('PersonaConfianza', back_populates='usuario')
    dispositivos_gestionados = db.relationship('Dispositivo', back_populates='gestor', foreign_keys='Dispositivo.id_gestor')
    dispositivos_asignados = db.relationship('Dispositivo', back_populates='usuario_asignado', foreign_keys='Dispositivo.id_usuario')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "contrasena_hash": self.contrasena_hash,
            "monitoreo": self.monitoreo,
            "es_monitoreo": self.es_monitoreo,
            "transacciones": [t.to_dict() for t in self.transacciones],
            "caracteristicas_usuario": [c.to_dict() for c in self.caracteristicas_usuario],
            "tarjetas": [t.to_dict() for t in self.tarjetas],
            "ubicaciones": [u.to_dict() for u in self.ubicaciones],
            "permisos_gestionados": [p.to_dict() for p in self.permisos_gestionados],
            "ubicaciones_creadas": [u.to_dict() for u in self.ubicaciones_creadas],
            "rutas": [r.to_dict() for r in self.rutas],
            "personas_confianza": [p.to_dict() for p in self.personas_confianza],
            "dispositivos_gestionados": [d.to_dict() for d in self.dispositivos_gestionados],
            "dispositivos_asignados": [d.to_dict() for d in self.dispositivos_asignados],
        }

    def to_dict_resumido(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None
        }
