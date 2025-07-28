from flask import Flask
from flask_cors import CORS
from routes.cursoRoutes import curso_bp
from routes.clinicasRoutes import clinica_bp
from routes.admRoutes import adm_bp
from db.database import Base, engine
from werkzeug.middleware.proxy_fix import ProxyFix
import os

def create_app():
    app = Flask(__name__)

    # CORRIGE o scheme, host, etc
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

    # Agora o CORS pode responder corretamente
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    Base.metadata.create_all(bind=engine)
    app.register_blueprint(curso_bp)
    app.register_blueprint(adm_bp)
    app.register_blueprint(clinica_bp)

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
