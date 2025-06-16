from flask import Blueprint
from controllers.cursoController import CursoController

curso_bp = Blueprint('curso', __name__, url_prefix='/cursoslista')

curso_bp.get('/')(CursoController.get_all)
curso_bp.get('/<int:id>')(CursoController.get_by_id)
curso_bp.post('/')(CursoController.create)
curso_bp.put('/<int:id>')(CursoController.update)
curso_bp.delete('/<int:id>')(CursoController.delete)
