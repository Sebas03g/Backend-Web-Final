from marshmallow import Schema, fields, validate

class PersonaConfianzaSchema(Schema):
    nombre = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
        error_messages={
            "required": "El nombre es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )

    telefono = fields.String(
        allow_none=True,
        validate=validate.Length(max=20),
        error_messages={"invalid": "Debe ser una cadena válida."}
    )

    descripcion = fields.String(
        allow_none=True,
        validate=validate.Length(max=1000),
        error_messages={"invalid": "Debe ser una cadena válida."}
    )

    id_usuario = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de usuario inválido."}
    )

    imagen = fields.String(
        allow_none=True,
        validate=validate.Length(max=255),
        error_messages={"invalid": "Debe ser una cadena válida."}
    )

    eliminado = fields.Boolean(missing=False)

    class Meta:
        partial = True
