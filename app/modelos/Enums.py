from enum import Enum as PyEnum
from sqlalchemy import Enum

class EstadoUsuario(PyEnum):
    VIAJE = "viaje"
    SEGURO = "seguro"
    CLIENTE = "cliente"
