from app import db, app
from models.CompanyModel import Company
from flask import request, jsonify
from urllib.parse import urlparse
from datetime import datetime
import re
from flask_jwt_extended import jwt_required, get_jwt_identity

# MARK: Companies

def company_application_routes(app):
    # DESC: Get all companies
    # PATH: /api/companies
    # Private
    @app.route('/api/companies', methods=['GET'])
    @jwt_required()
    def get_companies():
        user_id = get_jwt_identity()
        companies = Company.query.filter_by(user_id=user_id).all()
        res = [company.to_json() for company in companies]
        return jsonify(res)

    # DESC: Get a company by id
    # PATH: /api/companies/<int:id>
    # Private
    # @app.route('/api/companies/<int:id>', methods=['GET'])
    # @jwt_required()
    # def get_company(id):
    #     try:
    #         company = Company.query.get(id)
    #         if not company:
    #             return jsonify({'message': 'Company not found :('}), 404
    #         res = company.to_json()
    #         return jsonify(res)
    #     except Exception as e:
    #         return jsonify({'message': f'Failed to get this company, please try again :(, Error: {str(e)}'}), 500


    # DESC: Add a company
    # PATH: /api/companies
    # Private
    @app.route('/api/companies', methods=['POST'])
    @jwt_required()
    def add_company():
        try:
            user_id = get_jwt_identity()
            data = request.json
            # Get the domain from the link to get the logo
            parsed_url = urlparse(data['imageDomain'])
            domain = parsed_url.netloc or parsed_url.path
            img_url = f"https://logo.clearbit.com/{domain}"
            required_fields = ['name', 'role', 'city', 'link', 'applyDate', 'status']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'{field} is required'}), 400
                
            if not re.match(r'\d{1,2}/\d{1,2}/\d{4}', data['applyDate']):
                return jsonify({'error': 'Invalid date format. Please use MM/DD/YYYY.'}), 400

            company = Company(
                name=data['name'],
                role=data['role'],
                city=data['city'],
                link=data['link'],
                img_url=img_url,
                apply_date=data['applyDate'],
                status=data['status'],
                image_domain=data['imageDomain'],
                user_id=user_id
            )
            if company.status == 'Submitted':
                company.updated_at = datetime.strptime(company.apply_date, '%m/%d/%Y')
            else:
                company.updated_at = datetime.utcnow()
            db.session.add(company)
            db.session.commit()
            return jsonify(company.to_json()), 201
        except Exception as e:
            db.session.rollback() 
            return jsonify({'message': f'Failed to add this company, please try again :(, Error: {str(e)}'}), 500
        
    # DESC: Update a company
    # PATH: /api/companies/<int:id>
    # Private
    @app.route('/api/companies/<int:id>', methods=['PUT'])
    @jwt_required()
    def update_company(id):
        try:
            company = Company.query.get(id)
            if not company:
                return jsonify({'message': 'Company not found :('}), 404
            data = request.json
            company.name = data.get('name', company.name)
            company.role = data.get('role', company.role)
            company.city = data.get('city', company.city)
            company.link = data.get('link', company.link)
            company.status = data.get('status', company.status)
            company.image_domain = data.get('imageDomain', company.image_domain)
            company.img_url = f"https://logo.clearbit.com/{company.image_domain}"
            if company.status == 'Submitted':
                company.updated_at = datetime.strptime(company.apply_date, '%m/%d/%Y')
            else:
                company.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify(company.to_json()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to update this company, please try again :('}), 500

    # DESC: Delete a company
    # PATH: /api/companies/<int:id>
    # Private
    @app.route('/api/companies/<int:id>', methods=['DELETE'])
    @jwt_required()
    def delete_company(id):
        try:
            company = Company.query.get(id)
            if not company:
                return jsonify({'message': 'Company not found :('}), 404
            db.session.delete(company)
            db.session.commit()
            return jsonify({'message': 'Company deleted :)'})
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to delete this company, please try again :('}), 500
