from app import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    link = db.Column(db.String(120), unique=False, nullable=False)
    img_url = db.Column(db.String(120), nullable=True)
    apply_date = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    updated_at = db.Column(db.String(80), nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'city': self.city,
            'link': self.link,
            'imgUrl': self.img_url,
            'applyDate': self.apply_date,
            'status': self.status,
            'updatedAt': self.updated_at
        }