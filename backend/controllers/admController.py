from flask import request, jsonify
from services.admService import AdmService

class AdmController():    
  def get_all():
      adms = AdmService.get_all_adm()
      return jsonify([adm.to_dict() for adm in adms])

  def get_by_id(id):
      adm = AdmService.get_adm_by_id(id)
      return jsonify(adm.to_dict()) if adm else ('', 404)

  def create():
      data = request.json
      novo = AdmService.create_adm(data)
      return jsonify(novo.to_dict()), 201
  
  def update(id):
    data = request.json
    atualizado = AdmService.update_adm(id, data)
    return jsonify(atualizado)

  def delete(id):
      AdmService.delete_adm(id)
      return f"Adm {id} deletada", 204
  
  def authentication():
    data = request.json
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"error": "Usuário e senha obrigatórios"}), 400

    authenticated = AdmService.authentication(name, password)
    if authenticated:
        return jsonify(True)
    return jsonify(False)

     

