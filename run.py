from app import create_app, socketio_app

flask_app = create_app()
flask_app.debug = True

if __name__ == '__main__':
    socketio_app.run(flask_app, host='0.0.0.0', port=5000)
