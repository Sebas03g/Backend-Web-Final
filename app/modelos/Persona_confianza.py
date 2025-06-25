from ..config.database import db

class PersonaConfianza(db.Model):
    __tablename__ = 'persona_confianza'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    telefono = db.Column(db.String)
    descripcion = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))

    usuario = db.relationship('Usuario', back_populates='personas_confianza')