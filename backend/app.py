from flask import Flask
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
from routes.cursoRoutes import curso_bp
from routes.clinicasRoutes import clinica_bp
from routes.admRoutes import adm_bp
from db.database import Base, engine
import os

def create_app():
    app = Flask(__name__)

    # Middleware satânico do ProxyFix
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

    # Cors oficial do Flask
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    Base.metadata.create_all(bind=engine)
    app.register_blueprint(curso_bp)
    app.register_blueprint(adm_bp)
    app.register_blueprint(clinica_bp)

    # Hook de resposta que enfia os headers na marra
    @app.after_request
    def add_cors_headers(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    return app


app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
