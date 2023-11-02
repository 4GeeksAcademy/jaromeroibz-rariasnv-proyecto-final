from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Petitioner (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    email_address = db.Column(db.String(120), unique=True, nullable=False)
    offer_services = db.Column(db.String(120), unique=False, nullable=False)
    rating = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Petitioner {self.email_address}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "phone_number": self.phone_number,
            "address": self.address,
            "email_address": self.email_address,
            "offer_services": self.offer_services,
            "rating": self.rating
        }