from flask_sqlalchemy import SQLAlchemy
from enum import Enum
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine


db = SQLAlchemy()

class OffererStatus(Enum): 
    pending_approval = 'pending_approval',
    accepted = 'accepted',
    insuficient = 'insuficient',
    done = 'done'

class PetitionerStatus(Enum): 
    evaluating_proposal = 'evaluating_proposal',
    task_done = 'task_done',
    task_not_done = 'task_not_done'


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
    
class Petitioner (db.Model):
    __tablename__ = 'petitioner'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)


    def __repr__(self):
        return f'<Petitioner {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone_number": self.phone_number,
            "address": self.address,
            "email": self.email
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Category {self.category}>'

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category
        }
        
class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    status = db.Column(db.String(80), nullable = True, unique=False)
    petitioner_id = db.Column(db.Integer, db.ForeignKey('petitioner.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    petitioner = relationship(Petitioner)
    category = relationship(Category)

    def __repr__(self):
        return f'<Services {self.name}>'

    def serialize(self):    
        return {
            "id": self.id,
            "petitioner_id": self.petitioner_id,
            "name": self.name,
            "category_id": self.category_id,
            "description": self.description,
            "date": self.date,
            "status": self.status
        }
    

class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    state = db.Column(db.String(80), unique=False, nullable=False)
    city = db.Column(db.String(80), unique=False, nullable=False)
    county = db.Column(db.String(80), unique=False, nullable=False)
    full_address = db.Column(db.String(80), unique=False, nullable=False)
    zipcode = db.Column(db.String(80), unique=False, nullable=False)
    latitude = db.Column(db.String(80), unique=False, nullable=True)
    longitude = db.Column(db.String(80), unique=False, nullable=True)
    petitioner_id = db.Column(db.Integer, db.ForeignKey('petitioner.id'))
    petitioner = relationship(Petitioner)

    def __repr__(self):
        return f'<Address {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "petitioner_id": self.petitioner_id,
            "name": self.name,
            "full_address": self.full_address,
            "state": self.state,
            "city": self.city,
            "county": self.county,
            "latitude": self.latitude,
            "zipcode": self.zipcode,
            "longitude": self.longitude
        }
            # do not serialize the password, its a security breach

class Offerer(db.Model):
    __tablename__ = 'offerer'
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=True)
    rating = db.Column(db.Integer, unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Offerer {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone_number": self.phone_number,
            "address": self.address,
            "rating": self.rating,
            "email": self.email
        }
    

class OffererServices(db.Model):
    __tablename__ = 'offerer_services'
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    offerer_id = db.Column(db.Integer, db.ForeignKey('offerer.id'))
    status = db.Column(db.String(80), nullable = False, unique=False)
    price = db.Column(db.Integer(), nullable = True, unique=False)
    service = db.relationship(Services)
    offerer = db.relationship(Offerer)

    def __repr__(self):
        return f'<OffererServices {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "service_id": self.service_id,
            "offerer_id": self.offerer_id,
            "status": self.status,
            "price": self.price
        }



