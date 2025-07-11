from marshmallow import Schema, fields, validate

class PermisoSchema(Schema):
    nombre = fields.String(
        required=True,
        validate=validate.Length(min=1),
        error_messages={
            "required": "El nombre es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )
    descripcion = fields.String(
        allow_none=True,
        validate=validate.Length(max=1000),
        error_messages={
            "invalid": "Debe ser una cadena válida."
        }
    )
    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
