from marshmallow import Schema, fields, validate

class PermisoUsuarioSchema(Schema):
    id_dispositivo = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
        error_messages={
            "required": "El ID del dispositivo es obligatorio.",
            "invalid": "Debe ser un número entero válido."
        }
    )

    id_permiso = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
        error_messages={
            "required": "El ID del permiso es obligatorio.",
            "invalid": "Debe ser un número entero válido."
        }
    )

    nivel = fields.Integer(
        required=True,
        validate=validate.Range(min=0),
        error_messages={
            "required": "El nivel de permiso es obligatorio.",
            "invalid": "Debe ser un número entero válido."
        }
    )

    eliminado = fields.Boolean(
        missing=False
    )
