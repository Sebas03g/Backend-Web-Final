from marshmallow import Schema, fields, validate

class EnviarCorreoSchema(Schema):
    to = fields.Email(required=True, error_messages={"required": "El destinatario es obligatorio"})
    subject = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "El asunto es obligatorio"})
    body = fields.Str(load_default='')
    html = fields.Str(load_default='')

    class Meta:
        partial = True
