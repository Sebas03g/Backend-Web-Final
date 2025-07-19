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
    lat = fields.Decimal(
        allow_none=True,
        error_messages={"invalid": "Lat invalida."}
    )
    lng = fields.Decimal(
        allow_none=True,
        error_messages={"invalid": "Lng invalida."}
    )
    eliminado = fields.Boolean(load_default=False)

    class Meta:
        partial = True
