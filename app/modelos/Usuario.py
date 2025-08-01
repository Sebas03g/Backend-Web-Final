from ..config.database import db
from sqlalchemy import Numeric
import hashlib
from datetime import datetime
from werkzeug.security import check_password_hash

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(150), nullable=False)
    correo_electronico = db.Column(db.String(150), nullable=False)
    cedula = db.Column(db.String(10), nullable=False)
    telefono = db.Column(db.String(10), nullable=False)
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    contrasena_hash = db.Column(db.Text, nullable=False)
    monitoreo = db.Column(db.Boolean, nullable=False)
    modo_perdida = db.Column(db.Boolean, default=False)
    es_monitor = db.Column(db.Boolean, nullable=False)
    imagen = db.Column(db.String(150), nullable=True)
    eliminado = db.Column(db.Boolean, default=False)
    conectado = db.Column(db.DateTime, default=datetime.utcnow)
    id_plan = db.Column(db.Integer, db.ForeignKey('Plan.id', ondelete='SET NULL'), nullable=True)
    id_ruta_activa = db.Column(db.Integer, db.ForeignKey('Ruta.id', ondelete="SET NULL"), nullable=True)

    transacciones = db.relationship("Transaccion", back_populates='usuario')
    caracteristicas_usuario = db.relationship("Caracteristica_Usuario", back_populates='usuario')
    ubicacion = db.relationship('UbicacionUsuario', back_populates='usuario', uselist=False)
    ubicaciones_creadas = db.relationship('Ubicacion', back_populates='usuario')
    rutas = db.relationship('Ruta', back_populates='usuario', foreign_keys='Ruta.id_usuario')
    ruta_activa = db.relationship("Ruta", foreign_keys=[id_ruta_activa])
    personas_confianza = db.relationship('PersonaConfianza', back_populates='usuario')
    dispositivos_gestionados = db.relationship('Dispositivo', back_populates='gestor', foreign_keys='Dispositivo.id_gestor')
    dispositivos_asignados = db.relationship('Dispositivo', back_populates='usuario_asignado', foreign_keys='Dispositivo.id_usuario')
    plan = db.relationship('Plan', back_populates="usuarios")

    def set_password(self, password):
        self.contrasena_hash = self.generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.contrasena_hash, password)
    
    def generate_password_hash(self, password):
        data = bytes(password, 'utf-8')
        sha256_hash = hashlib.sha256(data).hexdigest()
        return sha256_hash

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "cedula": self.cedula,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "modo_perdida": self.modo_perdida,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "monitoreo": self.monitoreo,
            "es_monitor": self.es_monitor,
            "imagen": self.imagen,
            "eliminado": self.eliminado,
            "id_plan": self.id_plan,
            "ruta_activa": self.ruta_activa if self.ruta_activa else None,
            "transacciones": [t.to_dict() for t in self.transacciones if not t.eliminado] if self.transacciones else [],
            "caracteristicas_usuario": [c.to_dict() for c in self.caracteristicas_usuario if not c.eliminado] if self.caracteristicas_usuario else [],
            "ubicacion": self.ubicacion.to_dict() if self.ubicacion else None,
            "ubicaciones_creadas": [u.to_dict() for u in self.ubicaciones_creadas if not u.eliminado] if self.ubicaciones_creadas else [],
            "rutas": [r.to_dict() for r in self.rutas if not r.eliminado] if self.rutas else [],
            "personas_confianza": [p.to_dict_resumido() for p in self.personas_confianza if not p.eliminado] if self.personas_confianza else [],
            "dispositivos_gestionados": [d.to_dict() for d in self.dispositivos_gestionados if not d.eliminado] if self.dispositivos_gestionados else [],
            "dispositivos_asignados": [d.to_dict() for d in self.dispositivos_asignados if not d.eliminado] if self.dispositivos_asignados else [],
            "plan": self.plan.to_dict() if self.plan else None,
        }

    def to_dict_resumido(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "cedula": self.cedula,
            "correo_electronico": self.correo_electronico,
            "telefono": self.telefono,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "imagen": self.imagen,
            "modo_perdida": self.modo_perdida,
            "eliminado": self.eliminado,
            "rutas": [r.to_dict() for r in self.rutas if not r.eliminado] if self.rutas else [],
            "ruta_activa": self.ruta_activa if self.ruta_activa else None,
            "ubicacion": self.ubicacion.to_dict() if self.ubicacion else None,
            "ubicaciones_creadas": [u.to_dict() for u in self.ubicaciones_creadas if not u.eliminado] if self.ubicaciones_creadas else [],
            "personas_confianza": [p.to_dict_resumido() for p in self.personas_confianza if not p.eliminado] if self.personas_confianza else [],
        }
