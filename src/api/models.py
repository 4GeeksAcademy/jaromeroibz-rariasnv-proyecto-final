from flask_sqlalchemy import SQLAlchemy

import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
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
    details = db.Column(db.String(80), unique=False)
    zipcode = db.Column(db.String(80), unique=False, nullable=False)
    latitude = db.Column(db.String(80), unique=False)
    longitude = db.Column(db.String(80), unique=False)
    

    def __repr__(self):
        return f'<Address {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "full_address": self.full_address,
            "state": self.state,
            "city": self.city,
            "county": self.county,
            "latitude": self.latitude,
            "details": self.details,
            "zipcode": self.zipcode,
            "longitude": self.longitude
        }
            # do not serialize the password, its a security breach

class Petitioner (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    email_address = db.Column(db.String(120), unique=True, nullable=False)
    offer_services = db.Column(db.String(120), unique=False, nullable=False)
    rating = db.Column(db.Integer, unique=False, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

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

class Services(db.Model):
    # __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    category = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return f'<Services {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "date": self.date
        }

class Offerer(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    email_address = db.Column(db.String(120), unique=True, nullable=False)
    tasks_offer = db.Column(db.String(120), unique=False, nullable=False)
    rating = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Offerer {self.email_address}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "phone_number": self.phone_number,
            "address": self.address,
            "email_address": self.email_address,
            "tasks_offer": self.tasks_offer,
            "rating": self.rating
        }

class ServiceCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(80), unique=False, nullable=False)
    # service_id = db.Column(Integer, ForeignKey('services.id'))
    # service = relationship(Services)

    def __repr__(self):
        return f'<ServiceCategory {self.category}>'

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category
        }
