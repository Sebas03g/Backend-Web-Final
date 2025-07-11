from marshmallow import Schema, fields, validate
from datetime import datetime

class UbicacionUsuarioSchema(Schema):
    id_usuario = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
        error_messages={
            "required": "El ID del usuario es obligatorio.",
            "invalid": "ID de usuario inválido."
        }
    )
    id_punto = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
        error_messages={
            "required": "El ID del punto es obligatorio.",
            "invalid": "ID de punto inválido."
        }
    )
    fecha = fields.DateTime(
        required=False,
        load_default=lambda: datetime.utcnow(),
        format='iso',
        error_messages={
            "invalid": "Formato de fecha inválido, debe ser ISO 8601."
        }
    )
    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
