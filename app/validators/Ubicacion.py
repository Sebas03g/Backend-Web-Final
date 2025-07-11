from marshmallow import Schema, fields, validate

class UbicacionSchema(Schema):
    nombre_ubicacion = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
        error_messages={
            "required": "El nombre de la ubicación es obligatorio.",
            "invalid": "Debe ser una cadena válida."
        }
    )
    descripcion = fields.String(
        allow_none=True,
        validate=validate.Length(max=1000),
        error_messages={"invalid": "Debe ser una cadena válida."}
    )
    tipo = fields.String(
        allow_none=True,
        validate=validate.Length(max=100),
        error_messages={"invalid": "Debe ser una cadena válida."}
    )
    nivel = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=0),
        error_messages={"invalid": "Debe ser un entero válido."}
    )
    id_usuario = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de usuario inválido."}
    )
    id_punto = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de punto inválido."}
    )
    eliminado = fields.Boolean(missing=False)
