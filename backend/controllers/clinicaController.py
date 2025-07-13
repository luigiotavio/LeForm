from flask import request, jsonify
from services.clinicaService import ClinicaService

class ClinicaController():    
  def get_all():
      clinicas = ClinicaService.get_all_clinicas()
      return jsonify([clinica.to_dict() for clinica in clinicas])

  def get_by_id(id):
      clinica = ClinicaService.get_clinica_by_id(id)
      return jsonify(clinica.to_dict()) if clinica else ('', 404)

  def create():
      data = request.json
      novo = ClinicaService.create_clinica(data)
      return jsonify(novo.to_dict()), 201
  
  def update(id):
    data = request.json
    atualizado = ClinicaService.update_clinica(id, data)
    return jsonify(atualizado)

  def delete(id):
      ClinicaService.delete_clinica(id)
      return f"Clínica {id} deletada", 204
