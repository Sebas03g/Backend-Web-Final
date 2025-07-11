from marshmallow import Schema, fields, validate
from datetime import datetime

class TransaccionSchema(Schema):
    fecha = fields.DateTime(
        required=False,
        missing=lambda: datetime.now(),
        format='iso',
        error_messages={
            "invalid": "Formato de fecha inválido, debe ser ISO 8601."
        }
    )
    id_usuario = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de usuario inválido."}
    )
    id_tarjeta = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de tarjeta inválido."}
    )
    id_plan = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de plan inválido."}
    )
    eliminado = fields.Boolean(missing=False)

    class Meta:
        partial = True
