"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Address, Petitioner, Services, ServiceCategory, Offerer, OffererServices
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

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
    petitioner = Petitioner.query.filter_by(email_address=body['email_address']).first()

    if petitioner == None:
        petitioner = Petitioner(
            full_name = body['full_name'],
            phone_number = body['phone_number'],
            address = body['address'],
            email_address = body['email_address']
        )    

        db.session.add(petitioner)
        db.session.commit()

        return jsonify(petitioner.serialize()), 200

    else:
        return jsonify({ "msg": "Email address already exists" }), 401

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
    print(request.get_json())
    if request.get_json()['name']: update_address.name = request.get_json()['name']
    if request.get_json()['full_address']: update_address.full_address = request.get_json()['full_address']
    if request.get_json()['state']: update_address.state = request.get_json()['state']
    if request.get_json()['city']: update_address.city = request.get_json()['city']
    if request.get_json()['county']: update_address.county = request.get_json()['county']
    if request.get_json()['details']: update_address.details = request.get_json()['details']
    if request.get_json()['zipcode']: update_address.zipcode = request.get_json()['zipcode']
    if request.get_json()['latitude']: update_address.latitude = request.get_json()['latitude']
    if request.get_json()['longitude']: update_address.longitude = request.get_json()['longitude']
    
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
    petitioner_to_update.rating = body['rating'],
    petitioner_to_update.password = body['password']

    db.session.commit()
      
    response_body = {
        "msg": "Petitioner updated"
    }

    return jsonify(response_body), 200
    
@api.route('/services', methods=['GET'])
def get_services():

    all_services = Services.query.all()
    result = list(map(lambda item: item.serialize(), all_services))

    return jsonify(result), 200 

@api.route('/services_by_status_petitioner/<int:petitioner_id>', methods=['GET'])
def get_services_by_status_petitioner(petitioner_id):

    services_by_status = Services.query.filter_by(petitioner_id=petitioner_id, status = 'evaluating_proposal').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200 

# filtrar servicios por offerer y status

@api.route('/services_by_status_offerer_pending_approval/<int:offerer_id>', methods=['GET'])
def get_services_by_status_offerer_pending_approval(offerer_id):

    services_by_status = OffererServices.query.filter_by(offerer_id=offerer_id, status = 'pending_approval').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200

@api.route('/services_by_status_offerer_accepted/<int:offerer_id>', methods=['GET'])
def get_services_by_status_offerer_accepted(offerer_id):

    services_by_status = OffererServices.query.filter_by(offerer_id=offerer_id, status = 'accepted').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200  

@api.route('/services_by_status_offerer_insuficient/<int:offerer_id>', methods=['GET'])
def get_services_by_status_offerer_insuficient(offerer_id):

    services_by_status = OffererServices.query.filter_by(offerer_id=offerer_id, status = 'insuficient').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200 

@api.route('/services_by_status_offerer_done/<int:offerer_id>', methods=['GET'])
def get_services_by_status_offerer_done(offerer_id):

    services_by_status = OffererServices.query.filter_by(offerer_id=offerer_id, status = 'done').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200 

# filtrar servicios por petitioner y status

@api.route('/services_by_status_petitioner_evaluating_proposal/<int:petitioner_id>', methods=['GET'])
def get_services_by_status_petitioner_evaluating_proposal(petitioner_id):

    services_by_status = Services.query.filter_by(petitioner_id=petitioner_id, status = 'evaluating_proposal').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200

@api.route('/services_by_status_petitioner_finished/<int:petitioner_id>', methods=['GET'])
def get_services_by_status_petitioner_finished(petitioner_id):

    services_by_status = Services.query.filter_by(petitioner_id=petitioner_id, status = 'finished').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200

@api.route('/services_by_status_petitioner_not_started/<int:petitioner_id>', methods=['GET'])
def get_services_by_status_petitioner_not_started(petitioner_id):

    services_by_status = Services.query.filter_by(petitioner_id=petitioner_id, status = 'not_started').all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200

# filtrar servicios por service id y offerer id

@api.route('/services/<int:service_id>', methods =['GET'])
def get_service(service_id):
    service = Services.query.filter_by(id=service_id).first()

    return jsonify(service.serialize()), 200

@api.route('/offerer_service/<int:offerer_id>', methods =['GET'])
def get_offerer_service(offerer_id):
    service = OffererServices.query.filter_by(id=offerer_id).first()
    print(service)

    return jsonify(service.serialize()), 200

@api.route('/servicescategory', methods=['GET'])
def get_services_category():

    all_categories = ServiceCategory.query.all()
    result = list(map(lambda item: item.serialize(), all_categories))

    return jsonify(result), 200

@api.route('/servicecategory', methods =['POST'])
def add_service_category():
    body = request.get_json()
    service_category = ServiceCategory(
        category = body['category']
    )
    db.session.add(service_category)
    db.session.commit()

    response_body = {
        "message": "Service category created"
    }
    
    return jsonify(response_body), 200

# crear, editar y borrar servicios

@api.route('/service', methods =['POST'])
def add_service():
    body = request.get_json()
    service = Services(
        name = body['name'],
        category = body['category'],
        description = body['description'],
        date = body['date'],
        status = 'Created'
    )
    db.session.add(service)
    db.session.commit()

    response_body = {
        "message": "Service created"
    }
    
    return jsonify(response_body), 200

@api.route('/service/<int:service_id>', methods =['PUT'])
def update_service(service_id):
    
    update_service = Services.query.filter_by(id=service_id).first()
    print(update_service)

    update_service.name = request.get_json()['name']
    update_service.category = request.get_json()['category']
    update_service.description = request.get_json()['description']
    update_service.date = request.get_json()['date']

    
    db.session.commit()

    response_body = {
        "message": "Service updated"
    }
      
    return jsonify(response_body), 200


@api.route('/service/<int:service_id>', methods =['DELETE'])
def delete_service(service_id):
    delete_service = Services.query.filter_by(id=service_id).first()

    db.session.delete(delete_service)
    db.session.commit()

    response_body = {
        "message": "Service deleted"
    }
      
    return jsonify(response_body), 200

# sign in y sign up

@api.route("/signin_petitioner", methods=["POST"])
def login_petitioner():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email, password)
    
    petitioner = Petitioner.query.filter_by(email=email).first()
    print(petitioner)
    if email != petitioner.email or password != petitioner.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    petitioner_info = petitioner.serialize()
    petitioner_info['access_token']=access_token
    print(petitioner_info)
    return jsonify(petitioner_info)

@api.route("/signin_offerer", methods=["POST"])
def login_offerer():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email, password)
    
    offerer = Offerer.query.filter_by(email=email).first()
    print(offerer)
    if email != offerer.email or password != offerer.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    offerer_info = offerer.serialize()
    offerer_info['access_token']=access_token
    print(offerer_info)
    return jsonify(offerer_info)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    email = get_jwt_identity()
    # return jsonify(logged_in_as=current_user), 200
    user = User.query.filter_by(email=email).first()
    print(user)
    response_body = {
        "msg": "User found",
        "user": user.serialize()
    }

    return jsonify(response_body), 200


@api.route("/signup_petitioner", methods=["POST"])
def signup_petitioner():
    body = request.get_json()
    print(body)
    petitioner = Petitioner.query.filter_by(email=body["email"]).first()
    email = request.json.get("email", None)
    access_token = create_access_token(identity=email)

    print(petitioner)
    if petitioner == None:
        petitioner = Petitioner(name=body["name"], email=body["email"], password=body["password"])
        print(petitioner)
        db.session.add(petitioner)
        db.session.commit()
        petitioner_info = petitioner.serialize()
        petitioner_info['access_token']=access_token
        response_body = {

            "msg": "Petitioner created",
            "token": petitioner_info
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Petitioner already exists with this email address"}), 401
    

@api.route("/signup_offerer", methods=["POST"])
def signup_offerer():
    body = request.get_json()
    print(body)
    offerer = Offerer.query.filter_by(email=body["email"]).first()
    email = request.json.get("email", None)
    access_token = create_access_token(identity=email)

    print(offerer)
    if offerer == None:
        offerer = Offerer(name=body["name"], email=body["email"], password=body["password"])
        print(offerer)
        db.session.add(offerer)
        db.session.commit()
        offerer_info = offerer.serialize()
        offerer_info['access_token']=access_token
        response_body = {

            "msg": "Offerer created",
            "token": offerer_info
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Petitioner already exists with this email address"}), 401
    
# obtener, crear , editar y borrar un Offerer

@api.route('/offerer', methods=['GET'])
def get_all_offerer():
    all_offerer = Offerer.query.all()
    result = list(map( lambda offerer: offerer.serialize(), all_offerer ))

    return jsonify(result), 200

@api.route('/offerer/<int:offerer_id>', methods=['GET'])
def get_one_particular_offerer(offerer_id):
    particular_oferer = Offerer.query.filter_by(id=offerer_id).first()

    return jsonify(particular_oferer.serialize()), 200

@api.route('/offerer', methods=['POST'])
def create_offerer():
    body = request.get_json()
    offerer = Offerer.query.filter_by(email_address=body['email_address']).first()

    if offerer == None:
        offerer = Offerer(
            full_name= body['full_name'],
            phone_number= body['phone_number'],
            address= body['address'],
            email_address= body['email_address'],
            tasks_offer= body['tasks_offer'],
            rating= body['rating'],
            password= body['password']
        )

        db.session.add(offerer)
        db.session.commit()

        response_body = {
            "msg": "Offerer created"
        }

        return jsonify(response_body), 200
    
    else:
        return jsonify({ "msg": "Email address already exists" }), 401

@api.route('/offerer/<int:offerer_id>', methods=['DELETE'])
def delete_one_particular_offerer(offerer_id):
    offerer_to_delete = Offerer.query.filter_by(id=offerer_id).first()

    db.session.delete(offerer_to_delete)
    db.session.commit()

    response_body = {
        "msg": "Offerer deleted"
    }

    return jsonify(response_body), 200

@api.route('/offerer/<int:offerer_id>', methods=['PUT'])
def update_one_particular_offerer(offerer_id):
    offerer_to_update = Offerer.query.filter_by(id=offerer_id).first()
    body = request.get_json()

    offerer_to_update.full_name= body['full_name'],
    offerer_to_update.phone_number= body['phone_number'],
    offerer_to_update.address= body['address'],
    offerer_to_update.email_address= body['email_address'],
    offerer_to_update.tasks_offer= body['tasks_offer'],
    offerer_to_update.rating= body['rating'],
    offerer_to_update.password= body['password']

    db.session.commit()

    response_body = {
        "msg": "Offerer updated"
    }

    return jsonify(response_body), 200