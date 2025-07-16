from marshmallow import Schema, fields, validate
from datetime import datetime
from app.validators.Caracteristica_Usuario import CaracteristicaUsuarioSchema

class TransaccionSchema(Schema):
    fecha = fields.DateTime(
        required=False,
        load_default=lambda: datetime.now(),
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
    id_plan = fields.Integer(
        required=False,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de plan inválido."}
    )
    order_id = fields.String(
        required=True,
        validate=validate.Length(min=1, max=500),
        error_messages={
            "required": "El id de orden es obligatoria.",
            "invalid": "Debe ser una cadena válida."
        }
    )

    caracteristicas_usuario = fields.List(
        fields.Nested(CaracteristicaUsuarioSchema),
        required=False
    )

    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
