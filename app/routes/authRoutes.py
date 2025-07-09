from flask import Blueprint, request, jsonify, session
from app import db
from app.modelos.Usuario import Usuario

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if Usuario.query.filter_by(correo_electronico=data['correo_electronico']).first():
        return jsonify({"message": "Correo ya registrado"}), 400
    user = Usuario(nombre_completo = data['nombre_completo'],
                    correo_electronico=data['correo_electronico'],
                    telefono = data['correo_electronico'],
                    fecha_nacimiento = data['fecha_nacimiento'],
                    monitoreo = data['monitoreo'],
                    es_monitoreo = data['es_monitoreo'],
                    imagen = data['imagen'],
                    eliminado = data['eliminado'],
                    id_plan = data['id_plan'],
                   )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario creado exitosamente"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(correo_electronico=data['correo_electronico']).first()
    if user and user.check_password(data['password']):
        session['user_id'] = user.id
        return jsonify({"message": "Inicio de Sesión Exitoso"}), 200
    return jsonify({"message": "Credenciales Inválidas"}), 401
