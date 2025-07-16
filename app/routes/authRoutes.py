import datetime
from flask import Blueprint, request, jsonify, session, current_app, make_response
from app import db
import jwt
from app.modelos.Usuario import Usuario
from app.services.sendMail import enviar_correo
from flask_jwt_extended import set_access_cookies

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print(data['correo_electronico'])
    if Usuario.query.filter_by(correo_electronico=data['correo_electronico']).first():
        return jsonify({"message": "Correo ya registrado"}), 400
    user = Usuario(nombre_completo = data['nombre_completo'],
                    correo_electronico=data['correo_electronico'],
                    cedula=data["cedula"],
                    telefono = data['telefono'],
                    fecha_nacimiento = data['fecha_nacimiento'],
                    monitoreo = data['monitoreo'],
                    es_monitoreo = data['es_monitoreo'],
                    imagen = data['imagen'],
                    eliminado = data['eliminado'],
                    id_plan = data['id_plan'],
                   )
    user.set_password(data['contrasena_hash'])
    db.session.add(user)
    db.session.commit()

    enviar_correo(
        to=[data["correo_electronico"]],
        subject="Creacion Cuenta Ubikme",
        body="",
        html='<h2>Cuenta Creada Exitosamente</h2></br><h3>Te damos la bienvenida a Ubikame!</h3></br><p>Inicia sesión en este enlace: </p><a></a><a href="http://127.0.0.1:5000">Enlace aquí</a>'
    )

    return jsonify({"message": "Usuario creado exitosamente"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(correo_electronico=data['correo_electronico']).first()
    if user and user.check_password(data['password']):
        session['user_id'] = str(user.id)
        clave = current_app.config['JWT_SECRET_KEY']

        token = jwt.encode({
            'sub': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=10)
        }, clave, algorithm='HS256')
        
        response = make_response(jsonify({
                "message": "Inicio de Sesión Exitoso",
                "token": token,
                "usuario": user.to_dict()
            }))

        set_access_cookies(response, token)

        return response

    return jsonify({"message": "Credenciales Inválidas"}), 401

@auth.route('/logout', methods=['POST'])
def logout():
    if 'user_id' not in session:
        return jsonify({"message": "No hay sesión activa."}), 400

    session.clear()
    return jsonify({"message": "Logout exitoso."}), 200


