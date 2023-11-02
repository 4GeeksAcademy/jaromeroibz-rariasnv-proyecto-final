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

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    state = db.Column(db.String(80), unique=False, nullable=False)
    city = db.Column(db.String(80), unique=False, nullable=False)
    county = db.Column(db.String(80), unique=False, nullable=False)
    full_address = db.Column(db.String(80), unique=False, nullable=False)
    details = db.Column(db.String(80), unique=False, nullable=False)
    zipcode = db.Column(db.String(80), unique=False, nullable=False)
    latitude = db.Column(db.String(80), unique=False, nullable=False)
    longitude = db.Column(db.String(80), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<Address {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "full_address": self.full_address,
            "state": self.state,
            "city": self.city,

            # do not serialize the password, its a security breach
        }