from locust import HttpUser, task, between
import json
import random
from datetime import datetime

class UsuarioSimulado(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.email = f"test{random.randint(1, 100000)}@example.com"
        self.password = "123456"
        self.token = None
        self.signup()
        self.login()

    def signup(self):
        data = {
            "nombre_completo": "Test User",
            "correo_electronico": self.email,
            "cedula": str(random.randint(1000000000, 9999999999)),
            "telefono": "0999999999",
            "fecha_nacimiento": "2000-01-01T00:00:00",
            "monitoreo": True,
            "es_monitoreo": False,
            "imagen": "imagen.jpg",
            "eliminado": False,
            "id_plan": 1,
            "contrasena_hash": self.password
        }
        self.client.post("/signup", json=data)

    def login(self):
        response = self.client.post("/login", json={
            "correo_electronico": self.email,
            "password": self.password
        })

        if response.status_code == 200:
            self.token = response.json()["token"]

    def auth_headers(self):
        return {"Authorization": f"Bearer {self.token}"} if self.token else {}

    @task
    def obtener_usuarios(self):
        self.client.get("/usuario", headers=self.auth_headers())

    @task
    def obtener_personas_confianza(self):
        self.client.get("/persona-confianza", headers=self.auth_headers())

    @task
    def obtener_dispositivos(self):
        self.client.get("/dispositivo", headers=self.auth_headers())

    @task
    def obtener_planes(self):
        self.client.get("/plan", headers=self.auth_headers())

    @task
    def obtener_transacciones(self):
        self.client.get("/transaccion", headers=self.auth_headers())

    @task
    def obtener_ubicaciones(self):
        self.client.get("/ubicacion", headers=self.auth_headers())

    @task
    def obtener_rutas(self):
        self.client.get("/ruta", headers=self.auth_headers())

    @task
    def obtener_caracteristicas(self):
        self.client.get("/caracteristica", headers=self.auth_headers())

