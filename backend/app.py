from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

# Initialize Flask app
app = Flask(__name__)
CORS(app) # Allow CORS for all routes
# Initialize SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import routes.CompanyRoutes as CompanyRoutes

with app.app_context():
    db.create_all() # Create tables in the database

if __name__ == '__main__':
    app.run(debug=True, port=8080)
