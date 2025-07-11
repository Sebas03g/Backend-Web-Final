from marshmallow import Schema, fields, validate

class PlanSchema(Schema):
    nombre = fields.String(
        required=True,
        validate=validate.Length(min=1, max=150),
        error_messages={
            "required": "El nombre del plan es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )
    descripcion = fields.String(
        required=True,
        validate=validate.Length(min=1, max=500),
        error_messages={
            "required": "La descripción es obligatoria.",
            "invalid": "Debe ser una cadena válida."
        }
    )
    precio = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(min=0),
        error_messages={
            "required": "El precio es obligatorio.",
            "invalid": "Debe ser un número decimal válido."
        }
    )
    eliminado = fields.Boolean(missing=False)

    class Meta:
        partial = True
