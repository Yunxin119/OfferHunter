from app import db, app
from models.UserModel import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash

# DESC: Register a user
# PATH: /api/users/register
# Public
@app.route('/api/users/register', methods=['POST'])
def register_user():
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided :('}), 400
    if data['password'] != data['confirm_password']:
        return jsonify({'message': 'Passwords do not match :('}), 400
    required_fields = ['username', 'email', 'password', 'confirm_password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field} is required'}), 400
    
    userExist = User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first()
    if userExist:
        return jsonify({'message': 'User already exists :('}), 400
    try:
        hashed_password = generate_password_hash(data['password'])
        user = User(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create user, please try again'}), 500
    
# DESC: Login a user
# PATH: /api/users/login
# Public
@app.route('/api/users/login', methods=['POST'])
def user_login():
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided :('}), 400
    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field} is required'}), 400
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'User not found :('}), 404
    if not user.check_password(data['password']):
        return jsonify({'message': 'Incorrect password :('}), 400
    return jsonify({'message': 'User logged in successfully!'}), 200
