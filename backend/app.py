from flask import Flask
from controllers.admController import admin_bp

app = Flask(__name__)

app.register_blueprint(admin_bp)

if __name__ == "__main__":
    app.run(debug=True)
