import random
import string

def generar_codigo():
    caracteres = string.ascii_letters + string.digits  # a-z, A-Z, 0-9
    codigo = ''.join(random.choices(caracteres, k=10))
    return codigo