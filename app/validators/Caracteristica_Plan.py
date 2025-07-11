from marshmallow import Schema, fields, validate

class CaracteristicaPlanSchema(Schema):
    valor = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(min=0),
        error_messages={"required": "El valor es obligatorio.", "invalid": "Valor decimal inválido."}
    )

    id_caracteristica = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de característica inválido."}
    )

    id_plan = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
        error_messages={"invalid": "ID de plan inválido."}
    )

    eliminado = fields.Boolean(
        missing=False  # por defecto es False si no lo envías
    )
    class Meta:
        partial = True
