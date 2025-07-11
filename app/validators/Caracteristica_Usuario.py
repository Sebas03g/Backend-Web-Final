from marshmallow import Schema, fields, validate

class CaracteristicaUsuarioSchema(Schema):
    valor = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(min=0),
        error_messages={
            "required": "El campo 'valor' es obligatorio.",
            "invalid": "Debe ser un número decimal válido."
        }
    )

    id_caracteristica = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de característica inválido."}
    )

    id_usuario = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de usuario inválido."}
    )

    id_transaccion = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de transacción inválido."}
    )

    eliminado = fields.Boolean(
        load_default=False
    )

    class Meta:
        partial = True
