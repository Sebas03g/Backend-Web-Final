from app.modelos.Transaccion import Transaccion
from app.modelos.Caracteristica_Usuario import Caracteristica_Usuario
from app.repository.BaseRepo import BaseRepo
from sqlalchemy.exc import SQLAlchemyError
from app.config.database import db

class TransaccionRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)
    
    def create(self, data):
        try:
            caracteristicas_data = data.get('caracteristicas_usuario', [])
            nueva_transaccion = Transaccion(
                id_usuario=data['id_usuario'],
                id_plan=data['id_plan'],
                fecha=data['fecha'],
                caracteristicas_usuario=[
                    Caracteristica_Usuario(nombre=c['nombre'], valor=c['valor']) for c in caracteristicas_data
                ]
            )
        except SQLAlchemyError as e:
            db.session.rollback()
            raise Exception(f"Error creando objeto: {str(e)}")