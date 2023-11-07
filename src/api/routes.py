"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address, Petitioner
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/address', methods=['GET'])
def get_addresses():

    all_addresses = Address.query.all()
    result = list(map(lambda item: item.serialize(), all_addresses))

    return jsonify(result), 200

@api.route('/address/<int:address_id>', methods =['GET'])
def get_address(address_id):
    address = Address.query.filter_by(id=address_id).first()

    return jsonify(address.serialize()), 200

@api.route('/address', methods =['POST'])
def add_address():
    body = request.get_json()
    address = Address(
        name = body['name'],
        full_address = body['full_address'],
        state = body['state'],
        city = body['city'],
        county = body['county'],
        details = body['details'],
        zipcode = body['zipcode'],
        latitude = body['latitude'],
        longitude = body['longitude']
    )
    db.session.add(address)
    db.session.commit()

    response_body = {
        "message": "Address created"
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

@api.route('/address/<int:address_id>', methods =['DELETE'])
def delete_address(address_id):
    delete_address = Address.query.filter_by(id=address_id).first()

    db.session.delete(delete_address)
    db.session.commit()

    response_body = {
        "message": "Address deleted"
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

@api.route('/address/<int:address_id>', methods =['PUT'])
def update_address(address_id):
    
    update_address = Address.query.filter_by(id=address_id).first()
    print(update_address)
    update_address.full_address = request.get_json()['full_address']
    update_address.state = request.get_json()['state']
    update_address.city = request.get_json()['city']
    update_address.county = request.get_json()['county']
    update_address.details = request.get_json()['details']
    update_address.zipcode = request.get_json()['zipcode']
    update_address.latitude = request.get_json()['latitude']
    update_address.longitude = request.get_json()['longitude']
    
    db.session.commit()

    response_body = {
        "message": "Address updated"
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
    

   

