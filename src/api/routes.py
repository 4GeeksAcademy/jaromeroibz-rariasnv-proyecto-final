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

# crear, obtener, editar y borrar direcciones

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
        zipcode = body['zipcode']
    )
    db.session.add(address)
    db.session.commit()

    response_body = {
        "message": "Address created"
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
    if request.get_json()['zipcode']: update_address.zipcode = request.get_json()['zipcode']
    if request.get_json()['latitude']: update_address.latitude = request.get_json()['latitude']
    if request.get_json()['longitude']: update_address.longitude = request.get_json()['longitude']
    
    db.session.commit()

    response_body = {
        "message": "Address updated"
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

# crear, obtener, editar y borrar Solicitantes

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
    petitioner = Petitioner.query.filter_by(email=body['email']).first()

    if petitioner == None:
        petitioner = Petitioner(
            name = body['name'],
            phone_number = body['phone_number'],
            address = body['address'],
            email = body['email'],
            password = body['password']
        )    

        db.session.add(petitioner)
        db.session.commit()

        return jsonify(petitioner.serialize()), 200

    else:
        return jsonify({ "msg": "Email address already exists" }), 401

      
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

    petitioner_to_update.name = body['name']
    petitioner_to_update.phone_number = body['phone_number']
    petitioner_to_update.email = body['email']
    petitioner_to_update.address = body['address']
    petitioner_to_update.password = body['password']

    db.session.commit()
      
    response_body = {
        "msg": "Petitioner updated"
    }

    return jsonify(response_body), 200

# crear, obtener, editar y borrar Tasker

@api.route('/offerer', methods=['GET'])
def get_all_offerers():
    all_offerers = Offerer.query.all()
    result = list(map(lambda all_offerers: all_offerers.serialize() ,all_offerers))

    return jsonify(result), 200

@api.route('/offerer/<int:offerer_id>', methods=['GET'])
def get_one_particular_offerer(offerer_id):
    particular_offerer = Offerer.query.filter_by(id=offerer_id).first()

    return jsonify(particular_offerer.serialize()), 200

@api.route('/offerer', methods=['POST'])
def create_offerer():
    body = request.get_json()
    offerer = Offerer.query.filter_by(email=body['email']).first()

    if offerer == None:
        offerer = Offerer(
            name = body['name'],
            phone_number = body['phone_number'],
            address = body['address'],
            email = body['email'],
            password = body['password'],
            rating = body['rating']
        )    

        db.session.add(offerer)
        db.session.commit()

        return jsonify(offerer.serialize()), 200

    else:
        return jsonify({ "msg": "Email address already exists" }), 401

      
@api.route('/offerer/<int:offerer_id>', methods=['DELETE'])
def delete_one_particular_offerer(offerer_id):
    offerer_to_delete = Offerer.query.filter_by(id=offerer_id).first()

    db.session.delete(offerer_to_delete)
    db.session.commit()

    response_body = {
        "msg": "Petitioner deleted"
    }

    return jsonify(response_body), 200


@api.route('/offerer/<int:offerer_id>', methods=['PUT'])
def update_one_particular_offerer(offerer_id):
    offerer_to_update = Offerer.query.get(offerer_id)
    body = request.get_json()
    print(offerer_to_update)

    offerer_to_update.name = body["name"]
    offerer_to_update.phone_number = body["phone_number"]
    offerer_to_update.address = body["address"]
    offerer_to_update.email = body["email"]
    offerer_to_update.rating = body["rating"]
    offerer_to_update.password = body["password"]

    db.session.commit()
      
    response_body = {
        "msg": "Offerer updated"
    }

    return jsonify(response_body), 200

# obtener servicios por service id, offerer id y petitioner id
@api.route('/services', methods=['GET'])
@jwt_required()
def get_services():
    current_user = get_jwt_identity()
    all_services = Services.query.all()
    print(all_services)
    result = list(map(lambda item: item.serialize(), all_services))
    print(result)
    return jsonify(result), 200 

@api.route('/petitioner_services', methods=['GET'])
@jwt_required()
def get_petitioner_services():
    current_user = get_jwt_identity()
    print(current_user)
    print(current_user)
    all_services = Services.query.filter_by(petitioner_id=current_user).all()
    print(all_services)
    result = list(map(lambda item: item.serialize(), all_services))
    print(result)
    return jsonify(result), 200 


@api.route('/offerer_services', methods=['GET'])
@jwt_required()
def get_offerer_services():
    current_user = get_jwt_identity()
    print(current_user)
    all_services = OffererServices.query.filter_by(offerer_id=current_user).all()
    print(all_services)
    result = list(map(lambda item: item.serialize(), all_services))
    print(result)
    all_services_details = []
    for i in all_services: 
        servicio = Services.query.get(i.service_id)
        all_services_details.append({'id': servicio.id, 'name': servicio.name, 'category': servicio.category, 'description': servicio.description, 'date':servicio.date, 'status': servicio.status, 'petitioner_id': servicio.petitioner_id})
    print (all_services_details)
    
    return jsonify(all_services_details), 200


@api.route('/services/<int:service_id>', methods=['GET'])
def get_service_by_id(service_id):

    service_by_id = Services.query.filter_by(id=service_id).all()
    result = list(map(lambda item: item.serialize(), service_by_id))

    return jsonify(result), 200 

@api.route('/services_by_petitioner/<int:petitioner_id>', methods=['GET'])
def get_services_by_petitioner(petitioner_id):

    services_by_petitioner = Services.query.filter_by(petitioner_id=petitioner_id).all()
    result = list(map(lambda item: item.serialize(), services_by_petitioner))

    return jsonify(result), 200 

@api.route('/services_by_offerer/<int:offerer_id>', methods=['GET'])
def get_services_by_offerer(offerer_id):

    services_by_offerer = OffererServices.query.filter_by(offerer_id=offerer_id).all()
    result = list(map(lambda item: item.serialize(), services_by_offerer))

    return jsonify(result), 200 

# crear, editar y borrar servicios

@api.route('/services', methods =['POST'])
@jwt_required()
def add_service():
    current_user = get_jwt_identity()
    body = request.get_json()
    service = Services(
        name = body['name'],
        category = body['category'],
        description = body['description'],
        date = body['date'],
        status = 'evaluating_proposal',
        petitioner_id = current_user
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


@api.route('/delete_petitioner_service/<int:service_id>', methods =['DELETE'])
@jwt_required()
def delete_petitioner_service(service_id):
    current_user = get_jwt_identity()
    delete_service = Services.query.filter_by(id=service_id).first()

    db.session.delete(delete_service)
    db.session.commit()

    response_body = {
        "message": "Service deleted"
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

# filtrar servicios por offerer y status

@api.route('/services_by_status_offerer/<int:offerer_id>/<string:offerer_status>', methods=['GET'])
def get_services_by_status_offerer(offerer_id,offerer_status):

    services_by_status = OffererServices.query.filter_by(offerer_id=offerer_id, status = offerer_status).all()
    result = list(map(lambda item: item.serialize(), services_by_status))

    return jsonify(result), 200

# Actualizar status de un servicio

@api.route('/service_status_update/<int:service_id>', methods=['PUT'])
@jwt_required()

def update_service_status(service_id):

    current_user = get_jwt_identity()
    services_by_status = Services.query.filter_by(id=service_id).first()
    
    if services_by_status.status == 'finished':
        return jsonify({"message": "Status is 'finished', can't change it"}), 400
    if services_by_status.status == 'asigned':
        services_by_status.status = 'finished'
    if services_by_status.status == 'evaluating_proposal':
        services_by_status.status = 'asigned'
    

    db.session.commit()

    response_body = {
        "message": "Service status updated"
    }
      
    return jsonify(response_body), 200

@api.route('/service_status_update_insuficient/<int:service_id>', methods=['PUT'])
def update_service_status_insuficient(service_id):

    services_by_status = Services.query.filter_by(id=service_id).first()
    
    if services_by_status.status == 'finished':
        return jsonify({"message": "Status is 'finished', can't change it"}), 400
    if services_by_status.status == 'evaluating_proposal':
        return jsonify({"message": "Status is 'evaluating_proposal', asign it to an offerer"}), 400
    if services_by_status.status == 'asigned':
        services_by_status.status = 'insuficient'

    db.session.commit()

    response_body = {
        "message": "Service status updated"
    }
      
    return jsonify(response_body), 200

# # filtrar servicios por service id y offerer id

# @api.route('/services/<int:service_id>', methods =['GET'])
# def get_service(service_id):
#     service = Services.query.filter_by(id=service_id).first()

#     return jsonify(service.serialize()), 200

# @api.route('/offerer_service/<int:offerer_id>', methods =['GET'])
# def get_offerer_service(offerer_id):
#     service = OffererServices.query.filter_by(id=offerer_id).first()
#     print(service)

#     return jsonify(service.serialize()), 200


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

# sign in y sign up

@api.route("/signin_petitioner", methods=["POST"])
def login_petitioner():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    petitioner = Petitioner.query.filter_by(email=email).first()
    if email != petitioner.email or password != petitioner.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=petitioner.id)
    petitioner_info = petitioner.serialize()
    petitioner_info['access_token']=access_token
    return jsonify(petitioner_info)

@api.route("/signin_offerer", methods=["POST"])
def login_offerer():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    offerer = Offerer.query.filter_by(email=email).first()
    if email != offerer.email or password != offerer.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=offerer.id)
    offerer_info = offerer.serialize()
    offerer_info['access_token']=access_token
    print(offerer_info)
    return jsonify(offerer_info)


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

# @api.route('/offerer', methods=['GET'])
# def get_all_offerer():
#     all_offerer = Offerer.query.all()
#     result = list(map( lambda offerer: offerer.serialize(), all_offerer ))

#     return jsonify(result), 200

# @api.route('/offerer/<int:offerer_id>', methods=['GET'])
# def get_one_particular_offerer(offerer_id):
#     particular_oferer = Offerer.query.filter_by(id=offerer_id).first()

#     return jsonify(particular_oferer.serialize()), 200

# @api.route('/offerer', methods=['POST'])
# def create_offerer():
#     body = request.get_json()
#     offerer = Offerer.query.filter_by(email_address=body['email_address']).first()

#     if offerer == None:
#         offerer = Offerer(
#             full_name= body['full_name'],
#             phone_number= body['phone_number'],
#             address= body['address'],
#             email_address= body['email_address'],
#             tasks_offer= body['tasks_offer'],
#             rating= body['rating'],
#             password= body['password']
#         )

#         db.session.add(offerer)
#         db.session.commit()

#         response_body = {
#             "msg": "Offerer created"
#         }

#         return jsonify(response_body), 200
    
#     else:
#         return jsonify({ "msg": "Email address already exists" }), 401

# @api.route('/offerer/<int:offerer_id>', methods=['DELETE'])
# def delete_one_particular_offerer(offerer_id):
#     offerer_to_delete = Offerer.query.filter_by(id=offerer_id).first()

#     db.session.delete(offerer_to_delete)
#     db.session.commit()

#     response_body = {
#         "msg": "Offerer deleted"
#     }

#     return jsonify(response_body), 200

# @api.route('/offerer/<int:offerer_id>', methods=['PUT'])
# def update_one_particular_offerer(offerer_id):
#     offerer_to_update = Offerer.query.filter_by(id=offerer_id).first()
#     body = request.get_json()

#     offerer_to_update.full_name= body['full_name'],
#     offerer_to_update.phone_number= body['phone_number'],
#     offerer_to_update.address= body['address'],
#     offerer_to_update.email_address= body['email_address'],
#     offerer_to_update.tasks_offer= body['tasks_offer'],
#     offerer_to_update.rating= body['rating'],
#     offerer_to_update.password= body['password']

#     db.session.commit()

#     response_body = {
#         "msg": "Offerer updated"
#     }

#     return jsonify(response_body), 200