"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Address
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

@api.route('/address/<int:address_id>', methods =['DELETE'])
def delete_address(address_id):
    delete_address = Address.query.filter_by(id=address_id).first()

    db.session.delete(delete_address)
    db.session.commit()

    response_body = {
        "message": "Address deleted"
    }

    return jsonify(response_body), 200

@api.route('/address/<int:address_id>', methods =['PUT'])
def update_address(address_id):
    update_address = Address.query.filter_by(id=address_id).first()
    print(update_address)
    update_address.name = request.get_json()['name']
    print(update_address.name)
    print(request.get_json()['name'])

    db.session.commit()

    response_body = {
        "message": "Address updated"
    }

    return jsonify(response_body), 200