from flask import Flask
from flask_cors import CORS
from routes.cursoRoutes import curso_bp
from routes.clinicasRoutes import clinica_bp
from db.database import Base, engine

def create_app():
    app = Flask(__name__)
    CORS(app)  # Adicione esta linha
    Base.metadata.create_all(bind=engine)

    app.register_blueprint(curso_bp)
    app.register_blueprint(clinica_bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
