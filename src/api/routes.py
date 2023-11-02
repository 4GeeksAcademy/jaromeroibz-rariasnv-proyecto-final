"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Petitioner
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/petitioner', methods=['GET'])
def get_all_petitioner():
    all_petitioner = Petitioner.query.all()
    result = list(map(lambda petitioner: petitioner.serialize() ,all_petitioner))

    return jsonify(result), 200

@api.route('/petitioner/<int:petitioner_id>', methods=['GET'])
def get_one_particular_petitioner(petitioner_id):
    particular_petitioner = Petitioner.query.filter_by(id=petitioner_id).first()

    return jsonify(particular_petitioner.serialize()), 200

@api.route('/petitioner', methods=['POST'])
def create_petitioner():
    body = request.get_json()
    petitioner = Petitioner(
        full_name = body['full_name'],
        phone_number = body['phone_number'],
        address = body['address'],
        email_address = body['email_address'],
        offer_services = body['offer_services'],
        rating = body['rating']
    )    

    db.session.add(petitioner)
    db.session.commit()

    response_body = {
        "msg": "Petitioner created"
    }

    return jsonify(response_body), 200

@api.route('/petitioner/<int:petitioner_id>', methods=['DELETE'])
def delete_one_particular_petitioner(petitioner_id):
    petitioner_to_delete = Petitioner.query.filter_by(id=petitioner_id).first()

    db.session.delete(petitioner_to_delete)
    db.session.commit()

    response_body = {
        "msg": "Petitioner deleted"
    }

    return jsonify(response_body), 200

@api.route('/petitioner/<int:petitioner_id>', methods=['PUT'])
def update_one_particular_petitioner(petitioner_id):
    petitioner_to_update = Petitioner.query.filter_by(id=petitioner_id).first()
    body = request.get_json()

    petitioner_to_update.full_name = body['full_name']
    petitioner_to_update.phone_number = body['phone_number']
    petitioner_to_update.address = body['address']
    petitioner_to_update.email_address = body['email_address']
    petitioner_to_update.offer_services = body['offer_services']
    petitioner_to_update.rating = body['rating']

    db.session.commit()

    response_body = {
        "msg": "Petitioner updated"
    }

    return jsonify(response_body), 200

