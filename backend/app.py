from flask import Flask
from flask_cors import CORS
from routes.cursoRoutes import curso_bp
from routes.clinicasRoutes import clinica_bp
from routes.admRoutes import adm_bp
from db.database import Base, engine
import os

def create_app():
    app = Flask(__name__)
    # Definir CORS para permitir apenas o localhost na origem
    CORS(app, resources={r"/*": {"origins": "*"}})

    Base.metadata.create_all(bind=engine)
    app.register_blueprint(curso_bp)
    app.register_blueprint(adm_bp)
    app.register_blueprint(clinica_bp)

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
