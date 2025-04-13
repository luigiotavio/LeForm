from flask import request, jsonify
from services.cursoService import CursoService

class CursoController():
    def get_all():
        cursos = CursoService.get_all_cursos()
        return jsonify([curso.to_dict() for curso in cursos])

    def get_by_id(id):
        curso = CursoService.get_curso_by_id(id)
        return jsonify(curso.to_dict()) if curso else ('', 404)

    def create():
        data = request.json
        novo = CursoService.create_curso(data)
        return jsonify(novo.to_dict()), 201

    def update(id):
        data = request.json
        atualizado = CursoService.update_curso(id, data)
        return jsonify(atualizado)

    def delete(id):
        CursoService.delete_curso(id)
        return f'Curso {id} deletado!', 204
