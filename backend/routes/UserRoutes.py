from flask import request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, JWT_SECRET
from models.UserModel import User 
from datetime import timedelta

def register_user_routes(app):
    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = JWT_SECRET
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=20)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

    @app.route('/api/users', methods=['GET'])
    def get_all_users():
        users = User.query.all()
        return jsonify(users=[user.to_json() for user in users]), 200

    @app.route('/api/users/register', methods=['POST'])
    def register():
        try:
            data = request.get_json()
            if not data:
                return jsonify({"msg": "Invalid JSON data"}), 400
            username = data.get('username')
            password = data.get('password')
            confirm_password = data.get('confirmPassword')
            print(confirm_password)
            email = data.get('email')

            if User.query.filter_by(username=username).first():
                return jsonify({"msg": "User already exists"}), 400
            
            if (password != confirm_password):
                return jsonify({"msg": "Passwords do not match"}), 400

            hashed_password = generate_password_hash(password)
            new_user = User(username=username, email=email, password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.id)
            response = jsonify({
                'username': new_user.username,
                'email': new_user.email,
                'token': access_token
            })

            return response, 201
        except Exception as e:
            return jsonify({"msg": str(e)}), 400

    @app.route('/api/users/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 401

        if not check_password_hash(user.password_hash, password):
            return jsonify({"msg": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)
        response = jsonify({
            'username': user.username,
            'email': user.email,
            'token': access_token
        })
        return response, 200

    @app.route('/api/users/logout', methods=['POST'])
    @jwt_required()
    def logout():
        return jsonify({"msg": "Successfully logged out"}), 200

    @app.route('/api/users/profile', methods=['GET'])
    @jwt_required()
    def get_user():
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        return jsonify(user.to_json()), 200
    
    @app.route('/api/users/profile', methods=['PUT'])
    @jwt_required()
    def edit_profile():
        try: 
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            data = request.get_json()
            user.username = data.get('username')
            user.email = data.get('email')
            if data.get('password'):
                password = data.get('password')
                confirm_password = data.get('confirmPassword')
                if (password != confirm_password):
                    return jsonify({"msg": "Passwords do not match"}), 400
                user.password_hash = generate_password_hash(data.get('password'))
            db.session.commit()
            new_token = create_access_token(identity=user.id)

            return jsonify({
                "username": user.username,
                "email": user.email,
                "token": new_token
            }), 200
        except Exception as e:
            return jsonify({"msg": str(e)}), 400

    @app.route('/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        return jsonify(logged_in_as=user.to_json()), 200