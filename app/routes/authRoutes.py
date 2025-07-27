import datetime
import jwt
from flask import Blueprint, request, jsonify, session, current_app, make_response
from flask_jwt_extended import set_access_cookies
from app import db
from app.modelos.Usuario import Usuario
from app.services.sendMail import enviar_correo
from app.validators.Usuario import UsuarioSchema
from app.repository.BaseRepo import BaseRepo
from app.controller.UsuarioController import UsuarioController 
import random

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json

    if Usuario.query.filter_by(correo_electronico=data.get('correo_electronico')).first():
        return jsonify({"message": "Correo ya registrado"}), 400

    try:
        user = UsuarioController(Usuario, BaseRepo, UsuarioSchema).create(data)

        enviar_correo(
            to=[user.correo_electronico],
            subject="Creación de Cuenta - Ubikame",
            body="",
            html="""
                <h2>Cuenta Creada Exitosamente</h2>
                <h3>¡Te damos la bienvenida a Ubikame!</h3>
                <p>Inicia sesión en este enlace:</p>
                <a href="https://127.0.0.1:5000">Haz clic aquí</a>
            """
        )

        return jsonify({"message": "Usuario creado exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear usuario: {str(e)}"}), 400


@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('correo_electronico')
    password = data.get('password')

    user = Usuario.query.filter_by(correo_electronico=email).first()

    if user and user.check_password(password):
        session['user_id'] = str(user.id)

        clave = current_app.config['JWT_SECRET_KEY']
        token = jwt.encode({
            'sub': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=10)
        }, clave, algorithm='HS256')

        response = make_response(jsonify({
            "message": "Inicio de sesión exitoso",
            "token": token,
            "usuario": user.to_dict()
        }))

        set_access_cookies(response, token)
        return response

    return jsonify({"message": "Credenciales inválidas"}), 401


@auth.route('/logout', methods=['GET'])
def logout():
    if 'user_id' not in session:
        return jsonify({"message": "No hay sesión activa."}), 400

    session.clear()
    return jsonify({"message": "Logout exitoso."}), 200

@auth.route('/send-code', methods=['POST'])
def send_code():
    code = random.randint(100000, 999999)
    data = request.json

    correo_electronico = data.get('correo_electronico')
    try:
        enviar_correo(
            to=[correo_electronico],
            subject="Código de recuperación",
            body=f"Tu código de recuperación es: {code}",
            html=f"<p><strong>Código de recuperación:</strong> {code}</p>"
        )

        return jsonify({"message": "Correo Enviado Exitosamente",
                        "code":str(code)}), 201
    except Exception as e:
        return jsonify({"error": f"Error al crear usuario: {str(e)}"}), 400