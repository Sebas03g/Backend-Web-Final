import eventlet
import ssl
from app import create_app

try:
    app = create_app()
except Exception as e:
    print(f"Error al crear la app: {e}")
    exit(1)

if __name__ == "__main__":
    print("Servidor HTTPS iniciado...")
    eventlet.wsgi.server(
        eventlet.wrap_ssl(
            eventlet.listen(('0.0.0.0', 5000)),
            certfile='127.0.0.1+1.pem',
            keyfile='127.0.0.1+1-key.pem',
            server_side=True
        ),
        app
    )
