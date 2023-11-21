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
    
class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    category = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    status = db.Column(db.String(80), nullable = False, unique=False)
    petitioner_id = db.Column(db.Integer, db.ForeignKey('petitioner.id'))
    petitioner = relationship(Petitioner)

    def __repr__(self):
        return f'<Services {self.name}>'

    def serialize(self):    
        return {
            "id": self.id,
            "petitioner_id": self.petitioner_id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "date": self.date,
            "status": self.status
        }
    
    def serialize_created(self):
        service = Services.query.filter_by(status='created').first()
        if service is not None:
            return {
                "id": self.id,
                "name": self.name,
                "category": self.category,
                "description": self.description,
                "date": self.date,
                "status": self.status,
                "petitioner_id": self.petitioner_id
            }
    
    def serialize_accepted(self):
        service = Services.query.filter_by(status='accepted').first()
        if service is not None:
            return {
                "id": self.id,
                "name": self.name,
                "category": self.category,
                "description": self.description,
                "date": self.date,
                "status": self.status,
                "offerer_id": self.offerer_id
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
    petitioner_id = db.Column(Integer, ForeignKey('petitioner.id'))
    petitioner = relationship(Petitioner)

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
    service = db.relationship(Services)
    offerer = db.relationship(Offerer)

    def __repr__(self):
        return f'<OffererServices {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "service_id": self.service_id,
            "offerer_id": self.offerer_id,
            "status": self.status
        }
    
    def serialize_offerer_services(self):
        services = Services.query.filter_by(id=service_id).first()
        if services is not None:
            return {
                "id": self.id,
                "name": service.name(),
                "category": self.category,
                "date": self.date,
                "description": self.description,
                "status": self.status
            }
        
    # def serialize_accepted(self):
    #     service = Services.query.filter_by(status='accepted').first()
    #     if service is not None:
    #         return {
    #             "id": self.id,
    #             "rating": self.rating,
    #             "service": service.serialize(),
    #             "offerer_id": self.offerer_id
    #         }

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