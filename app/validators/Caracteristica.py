from marshmallow import Schema, fields, validate

class CaracteristicaSchema(Schema):
    nombre = fields.String(
        required=True,
        validate=validate.Length(min=1, max=150),
        error_messages={
            "required": "El nombre es obligatorio.",
            "invalid": "Debe ser una cadena válida.",
        }
    )

    descripcion = fields.String(
        required=True,
        validate=validate.Length(min=1, max=500),
        error_messages={
            "required": "La descripción es obligatoria.",
            "invalid": "Debe ser una cadena válida.",
        }
    )

    unidad_valor = fields.String(
        required=True,
        validate=validate.Length(min=1, max=150),
        error_messages={
            "required": "La unidad de valor es obligatoria.",
            "invalid": "Debe ser una cadena válida.",
        }
    )

    valor = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(min=0),
        error_messages={
            "required": "El valor numérico es obligatorio.",
            "invalid": "Debe ser un número decimal válido.",
        }
    )

    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
