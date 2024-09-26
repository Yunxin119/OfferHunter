from app import db, app
from flask import jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from models.UserModel import User

@app.route('/api/users/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    return jsonify(logged_in_as=user.to_json()), 200

@app.route('/api/token_in_blocklist', methods=['POST'])
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in blacklist