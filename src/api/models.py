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

class Address(db.Model):
    __tablename__ = 'address'
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
            "details": self.details,
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
    
class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    category = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    petitioner_id = db.Column(Integer, ForeignKey('petitioner.id'))
    petitioner = relationship(Petitioner, foreign_keys="Services.petitioner_id")

    def __repr__(self):
        return f'<Services {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "date": self.date,
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
        
class Status(db.Model):
    __tablename__ = 'status'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Status {self.status}>'

    def serialize(self):
        return {
            "id": self.id,
            "status": self.status
        }
            
class OffererServices(db.Model):
    __tablename__ = 'offerer_services'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, unique=False, nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    offerer_id = db.Column(db.Integer, db.ForeignKey('offerer.id'))
    status_id = db.Column(db.Integer, db.ForeignKey('status.id'))
    status = db.relationship(Status)
    service = db.relationship(Services)
    offerer = db.relationship(Offerer)

    def __repr__(self):
        return f'<OffererServices {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "service_id": self.service_id,
            "offerer_id": self.offerer_id,
            "status_id": self.status_id
        }
    
    def serialize_pending_approval(self):
        service = OffererServices.query.filter_by(status='pending_approval').first()
        if service is not None:
            return {
                "id": self.id,
                "rating": self.rating,
                "service": service.serialize(),
                "offerer_id": self.offerer_id
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

class PetitionerServices(db.Model):
    __tablename__ = 'petitioner_services'
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    petitioner_id = db.Column(db.Integer, db.ForeignKey('petitioner.id'))
    status_id = db.Column(db.Integer, db.ForeignKey('status.id'))
    status = db.relationship(Status)
    service = db.relationship(Services)
    petitioner = db.relationship(Petitioner)

    def __repr__(self):
        return f'<PetitionerServices {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "service_id": self.service_id,
            "petitioner_id": self.petitioner_id,
            "status": self.status
        }
    
    def serialize_approve(self):
        service = PetitionerServices.query.filter_by(status='accepted').first()
        if service is not None:
            return {
                "id": self.id,
                "rating": self.rating,
                "service": service.serialize(),
                "offerer_id": self.offerer_id
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