from marshmallow import Schema, fields, validate

class TarjetaSchema(Schema):
    numero_tarjeta = fields.String(
        required=True,
        validate=validate.Length(equal=16),  # usualmente tarjetas tienen 16 dígitos
        error_messages={
            "required": "El número de tarjeta es obligatorio.",
            "invalid": "Debe ser una cadena válida de 16 caracteres."
        }
    )
    mes_expiracion = fields.Integer(
        required=True,
        validate=validate.Range(min=1, max=12),
        error_messages={
            "required": "El mes de expiración es obligatorio.",
            "invalid": "Debe ser un entero entre 1 y 12."
        }
    )
    anio_expiracion = fields.Integer(
        required=True,
        validate=validate.Range(min=2000, max=2100),
        error_messages={
            "required": "El año de expiración es obligatorio.",
            "invalid": "Debe ser un entero válido."
        }
    )
    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
