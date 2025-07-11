from app.modelos.Caracteristica_Plan import Caracteristica_Plan
from app.repository.BaseRepo import BaseRepo
from app.config.database import db

class PlanRepo(BaseRepo):
    def __init__(self, Objeto):
        super().__init__(Objeto)

    def create(self, data):
        try:
            caracteristicas = data.pop('caracteristicas_plan', [])
            nuevo_plan = self.tipoObjeto(**data)
            db.session.add(nuevo_plan)
            db.session.flush()
            for c in caracteristicas:
                caracteristica = Caracteristica_Plan(
                    nombre=c['nombre'],
                    valor=c['valor'],
                    id_caracteristica=c['id_caracteristica'],
                    id_plan=nuevo_plan.id
                )
                db.session.add(caracteristica)

            db.session.commit()
            return nuevo_plan 

        except Exception as e:
            db.session.rollback()
            raise e 
