from flask import request, jsonify

class BaseController:
    def __init__(self, objeto, repositorio):
        self.tipoObjeto = objeto
        self.repositorio = repositorio(objeto)
    
    def create(self):
        data = request.json
        try:
            nuevo_objeto = self.repositorio.create(data)
            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{str(self.tipoObjeto)} creado"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    def getAll(self):
        datos = self.repositorio.getAll()

        return jsonify([dato.to_dict() for dato in datos])

    
    def getById(self,id):
        dato = self.repositorio.getById(id)
        diccionario = {}
        for key, value in dato.items():
            diccionario[key] = value
        return jsonify(diccionario)
    
    def update(self,id):
        data = request.json
        try:
            objeto_modificado = self.repositorio.update(id, data)
            return jsonify({"id": objeto_modificado.id, "mensaje": f"{str(self.tipoObjeto)} creado"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    def delete(self,id):
        data = request.json
        try:
            self.repositorio.delete(id)
        except Exception as e:
            return jsonify({"error": str(e)}), 400

        