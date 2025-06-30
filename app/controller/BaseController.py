from flask import request, jsonify

class BaseController:
    def __init__(self, objeto, repositorio):
        self.tipoObjeto = objeto
        self.repositorio = repositorio(objeto)
    
    def create(self):
        data = request.json
        try:
            nuevo_objeto = self.repositorio.create(data)
            return jsonify({"id": nuevo_objeto.id, "mensaje": f"{self.tipoObjeto.__name__} creado", "objeto": nuevo_objeto.to_dict() }), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    def getAll(self):
        datos = self.repositorio.getAll()
        return jsonify([dato.to_dict() for dato in datos])

    def getById(self, id):
        dato = self.repositorio.getById(id)
        if not dato:
            return jsonify({"error": f"{self.tipoObjeto.__name__} no encontrado"}), 404
        return jsonify(dato.to_dict())
    
    def update(self, id):
        data = request.json
        try:
            objeto_modificado = self.repositorio.update(id, data)
            if not objeto_modificado:
                return jsonify({"error": f"{self.tipoObjeto.__name__} no encontrado"}), 404
            return jsonify({"id": objeto_modificado.id, "mensaje": f"{self.tipoObjeto.__name__} actualizado", "objeto": objeto_modificado.to_dict()}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    def delete(self, id):
        try:
            eliminado = self.repositorio.delete(id)
            if not eliminado:
                return jsonify({"error": f"{self.tipoObjeto.__name__} no encontrado"}), 404
            return jsonify({"mensaje": f"{self.tipoObjeto.__name__} eliminado"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
