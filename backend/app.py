from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app) # Allow CORS for all routes

# Load environment variables
load_dotenv()
JWT_SECRET = os.getenv('JWT_SECRET')
app.config['JWT_SECRET_KEY'] = JWT_SECRET 
# Initialize SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import routes.CompanyRoutes as CompanyRoutes
import routes.UserRoutes as UserRoutes

UserRoutes.register_user_routes(app)
CompanyRoutes.company_application_routes(app)

with app.app_context():
    db.create_all() # Create tables in the database

if __name__ == '__main__':
    app.run(debug=True, port=8080)
