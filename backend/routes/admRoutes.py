from flask import Blueprint
from flask_cors import cross_origin
from flask import request
from controllers.admController import AdmController

adm_bp = Blueprint('adm', __name__, url_prefix='/adm')

adm_bp.get('/')(AdmController.get_all)
adm_bp.get('/<int:id>')(AdmController.get_by_id)
adm_bp.post('/')(AdmController.create)
adm_bp.post('/authentication')(AdmController.authentication)
adm_bp.put('/<int:id>')(AdmController.update)
adm_bp.delete('/<int:id>')(AdmController.delete)
