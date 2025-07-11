from marshmallow import Schema, fields, validate

class PuntoSchema(Schema):
    lat = fields.Float(
        required=True,
        validate=validate.Range(min=-90, max=90),
        error_messages={
            "required": "La latitud es obligatoria.",
            "invalid": "Latitud debe ser un número entre -90 y 90."
        }
    )
    lng = fields.Float(
        required=True,
        validate=validate.Range(min=-180, max=180),
        error_messages={
            "required": "La longitud es obligatoria.",
            "invalid": "Longitud debe ser un número entre -180 y 180."
        }
    )
    hora = fields.DateTime(
        allow_none=True,
        format='iso',
        error_messages={
            "invalid": "Formato de fecha y hora inválido, debe ser ISO 8601."
        }
    )
    id_ruta = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de ruta inválido."}
    )
    eliminado = fields.Boolean(missing=False)

    class Meta:
        partial = True
