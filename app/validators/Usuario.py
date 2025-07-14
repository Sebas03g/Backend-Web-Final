from marshmallow import Schema, fields, validate, validates, validates_schema, ValidationError
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
        error_messages={
            "required": "El correo electrónico es obligatorio.",
            "invalid": "Correo electrónico inválido."
        }
    )

    cedula = fields.String(
        required=True,
        validate=validate.Length(equal=10),
        error_messages={"required": "La cédula es obligatoria.", "invalid": "Cédula inválida."}
    )

    telefono = fields.String(
        required=True,
        validate=validate.Length(equal=10),
        error_messages={"required": "El teléfono es obligatorio.", "invalid": "Teléfono inválido."}
    )

    fecha_nacimiento = fields.DateTime(
        required=True,
        format='iso',
        error_messages={
            "required": "La fecha de nacimiento es obligatoria.",
            "invalid": "Formato de fecha inválido. Usa formato ISO (YYYY-MM-DDTHH:MM:SS)."
        }
    )

    contrasena_hash = fields.String(
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

    eliminado = fields.Boolean(load_default=False)

    @validates_schema
    def validar_telefono(self, data, **kwargs):
        telefono = data.get("telefono")
        if not re.fullmatch(r"\d{10}", telefono):
            raise ValidationError("El teléfono debe contener exactamente 10 dígitos numéricos.")

    @validates_schema
    def validar_fecha_nacimiento(self, data, **kwargs):
        fecha = data.get("fecha_nacimiento")
        if fecha and fecha > datetime.utcnow():
            raise ValidationError(
                {"fecha_nacimiento": "La fecha de nacimiento no puede ser futura."}
            )

    class Meta:
        partial = True