from flask import request, jsonify
from services.clinicaService import ClinicaService

class ClinicaController():
  def get_all():
      clinicas = ClinicaService.get_all_cursos()
      return jsonify([clinica.__dict__ for clinica in clinicas])

  def get_by_id(id):
      clinica = ClinicaService.get_curso_by_id(id)
      return jsonify(clinica.__dict__) if clinica else ('', 404)

  def create():
      data = request.json
      novo = ClinicaService.create_curso(data)
      return jsonify(novo.__dict__), 201

  def update(id):
      data = request.json
      atualizado = ClinicaService.update_curso(id, data)
      return jsonify(atualizado.__dict__)

  def delete(id):
      ClinicaService.delete_curso(id)
      return '', 204
