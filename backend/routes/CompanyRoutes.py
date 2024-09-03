from app import db, app
from models.CompanyModel import Company
from models.RejectedModel import Rejected
from flask import request, jsonify
from urllib.parse import urlparse
from datetime import datetime
import re

# MARK: Companies

# DESC: Get all companies
# PATH: /api/companies
# Private
@app.route('/api/companies', methods=['GET'])
def get_companies():
    companies = Company.query.all()
    res = [company.to_json() for company in companies]
    return jsonify(res)

# DESC: Get a company by id
# PATH: /api/companies/<int:id>
# Private
@app.route('/api/companies/<int:id>', methods=['GET'])
def get_company(id):
    try:
        company = Company.query.get(id)
        if not company:
            return jsonify({'message': 'Company not found :('}), 404
        res = company.to_json()
        return jsonify(res)
    except Exception as e:
        return jsonify({'message': f'Failed to get this company, please try again :(, Error: {str(e)}'}), 500


# DESC: Add a company
# PATH: /api/companies
# Private
@app.route('/api/companies', methods=['POST'])
def add_company():
    try:
        data = request.json
        # Get the domain from the link to get the logo
        parsed_url = urlparse(data['link'])
        domain = parsed_url.netloc or parsed_url.path
        domain = re.sub(r'^www\.', '', domain)
        img_url = f"https://logo.clearbit.com/{domain}"
        #  | f"https://placehold.jp/aaaaaa/ffffff/150x150.png?text=No%20Image" for placeholder use later
        required_fields = ['name', 'role', 'city', 'link', 'applyDate', 'status']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        company = Company(
            name=data['name'],
            role=data['role'],
            city=data['city'],
            link=data['link'],
            img_url=img_url,
            apply_date=data['applyDate'],
            status=data['status']
        )
        db.session.add(company)
        db.session.commit()
        return jsonify({'message': 'Company added :)'})
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of an error
        return jsonify({'message': f'Failed to add this company, please try again :(, Error: {str(e)}'}), 500

# DESC: Update a company
# PATH: /api/companies/<int:id>
# Private
@app.route('/api/companies/<int:id>', methods=['PUT'])
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
        company.updated_at = data.get('updatedAt', company.updated_at)

        db.session.commit()
        return jsonify({'message': 'Company updated :)'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update this company, please try again :('}), 500

# DESC: Delete a company
# PATH: /api/companies/<int:id>
# Private
@app.route('/api/companies/<int:id>', methods=['DELETE'])
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


# MARK: Rejected Companies

# DESC: Put a company to rejected directory
# PATH: /api/companies/reject/<int:id>
# Private
@app.route('/api/companies/reject/<int:id>', methods=['POST'])
def reject_company(id):
    try:
        company = Company.query.get(id)
        if not company:
            return jsonify({'message': 'Company not found :('}), 404
        reject_company = Rejected(
            name=company.name,
            role=company.role,
            city=company.city,
            link=company.link,
            img_url=company.img_url,
            apply_date=company.apply_date,
            rejected_at=datetime.utcnow()
        )
        db.session.add(reject_company)
        db.session.delete(company)
        db.session.commit()
        return jsonify({'message': 'Status Updated'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to move this company, please try again :(, Error: {str(e)}'}), 500

# DESC: Get all rejected companies
# PATH: /api/companies/reject
# Private
@app.route('/api/companies/reject', methods=['GET'])
def get_rejected_companies():
    rejected_companies = Rejected.query.all()
    res = [company.to_json() for company in rejected_companies]
    return jsonify(res)

# DESC: Delete a rejected company
# PATH: /api/companies/reject/<int:id>
# Private
@app.route('/api/companies/reject/<int:id>', methods=['DELETE'])
def delete_rejected_company(id):
    try:
        company = Rejected.query.get(id)
        if not company:
            return jsonify({'message': 'Company not found :('}), 404
        db.session.delete(company)
        db.session.commit()
        return jsonify({'message': 'Company deleted :)'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete this company, please try again :('}), 500
