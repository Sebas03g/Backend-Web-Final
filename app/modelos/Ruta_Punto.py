from ..config.database import db
from datetime import datetime

class RutaPunto(db.Model):
    __tablename__ = 'RutaPunto'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ruta_id = db.Column(db.Integer, db.ForeignKey('Ruta.id'), primary_key=True)
    punto_id = db.Column(db.Integer, db.ForeignKey('Punto.id'), primary_key=True)
    fecha_asignacion = db.Column(db.DateTime, default=datetime.utcnow)

    ruta = db.relationship("Ruta", back_populates="ruta_puntos")
    punto = db.relationship("Punto", back_populates="ruta_puntos")
    eliminado = db.Column(db.Boolean, default=False)

    def get_point(self):
        return {
            "punto": self.punto.to_dict_resumido() if self.punto else None,
            "fecha": self.fecha_asignacion
        }
    
    def get_ruta(self):
        return {
            "ruta": self.ruta.to_dict_resumido() if self.ruta else None
        }
    
    def to_dict(self):
        return {
            "punto": self.punto.to_dict_resumido() if self.punto else None,
            "ruta": self.ruta.to_dict_resumido() if self.ruta else None,
            "fecha": self.fecha_asignacion
        }
