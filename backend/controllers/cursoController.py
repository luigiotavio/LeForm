from flask import request, jsonify
from services.cursoService import CursoService

class CursoController():
    def get_all():
        cursos = CursoService.get_all_cursos()
        return jsonify([curso.__dict__ for curso in cursos])

    def get_by_id(id):
        curso = CursoService.get_curso_by_id(id)
        return jsonify(curso.__dict__) if curso else ('', 404)

    def create():
        data = request.json
        novo = CursoService.create_curso(data)
        return jsonify(novo.__dict__), 201

    def update(id):
        data = request.json
        atualizado = CursoService.update_curso(id, data)
        return jsonify(atualizado.__dict__)

    def delete(id):
        CursoService.delete_curso(id)
        return '', 204
