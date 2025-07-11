from marshmallow import Schema, fields, validate

class DispositivoSchema(Schema):
    nombre_completo = fields.String(
        required=True,
        validate=validate.Length(min=3, max=150),
        error_messages={
            "required": "El nombre completo es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )

    cedula = fields.String(
        required=True,
        validate=validate.Regexp(r'^\d{10}$', error="La cédula debe tener exactamente 10 dígitos.")
    )

    correo_electronico = fields.Email(
        required=True,
        error_messages={
            "required": "El correo electrónico es obligatorio.",
            "invalid": "Formato de correo inválido."
        }
    )

    telefono = fields.String(
        required=True,
        validate=validate.Regexp(r'^\d{10}$', error="El teléfono debe tener exactamente 10 dígitos.")
    )

    codigo = fields.String(
        required=True,
        validate=validate.Length(min=1, max=15),
        error_messages={
            "required": "El código del dispositivo es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )

    id_usuario = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de usuario inválido."}
    )

    id_gestor = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID del gestor inválido."}
    )

    eliminado = fields.Boolean(missing=False)
