from marshmallow import Schema, fields, validate, validates, ValidationError
import re
from datetime import datetime

class UsuarioSchema(Schema):
    nombre_completo = fields.String(
        required=True,
        validate=validate.Length(min=1, max=150),
        error_messages={"required": "El nombre completo es obligatorio."}
    )
    correo_electronico = fields.Email(
        required=True,
        validate=validate.Length(max=150),
        error_messages={"required": "El correo electrónico es obligatorio.", "invalid": "Correo inválido."}
    )
    cedula = fields.String(
        required=True,
        validate=validate.Length(equal=10),
        error_messages={"required": "La cedula es obligatorio.", "invalid": "Cedula inválida."}
    )
    telefono = fields.String(
        required=True,
        validate=validate.Length(equal=10),
        error_messages={"required": "El teléfono es obligatorio.", "invalid": "Teléfono inválido."}
    )
    fecha_nacimiento = fields.DateTime(
        required=True,
        format='iso',
        error_messages={"required": "La fecha de nacimiento es obligatoria.", "invalid": "Formato de fecha inválido."}
    )
    contrasena = fields.String(
        required=True,
        load_only=True,
        validate=validate.Length(min=6, max=128),
        error_messages={"required": "La contraseña es obligatoria."}
    )
    monitoreo = fields.Boolean(required=True)
    es_monitoreo = fields.Boolean(required=True)
    imagen = fields.String(
        required=True,
        validate=validate.Length(max=150),
        error_messages={"required": "La imagen es obligatoria."}
    )
    id_plan = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de plan inválido."}
    )
    eliminado = fields.Boolean(missing=False)

    @validates("telefono")
    def validate_telefono(self, value):
        if not re.fullmatch(r"\d{10}", value):
            raise ValidationError("El teléfono debe contener exactamente 10 dígitos numéricos.")

    @validates("fecha_nacimiento")
    def validate_fecha_nacimiento(self, value):
        if value > datetime.utcnow():
            raise ValidationError("La fecha de nacimiento no puede ser futura.")
