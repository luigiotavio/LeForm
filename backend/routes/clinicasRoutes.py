from flask import Blueprint
from controllers.clinicaController import ClinicaController

clinica_bp = Blueprint('clinica', __name__, url_prefix='/clinicas')

clinica_bp.get('/')(ClinicaController.get_all)
clinica_bp.get('/<int:id>')(ClinicaController.get_by_id)
clinica_bp.post('/')(ClinicaController.create)
clinica_bp.put('/<int:id>')(ClinicaController.update)
clinica_bp.delete('/<int:id>')(ClinicaController.delete)
