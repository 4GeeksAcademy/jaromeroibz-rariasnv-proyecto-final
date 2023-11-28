"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Address, Petitioner, Services, Category, Offerer, OffererServices
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():


    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# crear, obtener, editar y borrar direcciones

@api.route('/address', methods=['GET'])
@jwt_required()
def get_addresses():
    current_user = get_jwt_identity()

    all_addresses = Address.query.filter_by(petitioner_id=current_user).all()
    print(all_addresses)
    result = list(map(lambda item: item.serialize(), all_addresses))

    return jsonify(result) 

@api.route('/address/<int:address_id>', methods =['GET'])
def get_address(address_id):
    address = Address.query.filter_by(id=address_id).first()

    return jsonify(address.serialize()), 200

@api.route('/add_address', methods =['POST'])
@jwt_required()
def add_address():
    current_user = get_jwt_identity()
    print(current_user)
    body = request.get_json()
    address = Address(
        name = body['name'],
        full_address = body['full_address'],
        state = body['state'],
        city = body['city'],
        county = body['county'],
        country = body['country'],
        latitude = body['latitude'],
        longitude = body['longitude'],
        zipcode = body['zipcode'],
        petitioner_id= current_user
    )
    print(address)
    db.session.add(address)
    db.session.commit()

    response_body = {
        "message": "Address created"
    }
    
    return jsonify(response_body), 200

@api.route('/addressdetails', methods =['POST'])
@jwt_required()
def add_address_details():
    body = request.get_json()
    current_user = get_jwt_identity()
    petitioner_data = Petitioner.query.filter_by(id=current_user).all()
    print(petitioner_data)
    petitioner_id = petitioner_data.id
    print(petitioner_id)

    address_details = Address(
        name = body['name'],
        full_address = body['full_address'],
        county = body['county'],
        city = body['city'],
        state = body['state'],
        country = body['country'],
        zipcode = body['zipcode'],
        latitude = body['latitude'],
        longitude = body['longitude'],
        petitioner_id = petitioner_id
    )
    
    db.session.add(address_details)
    db.session.commit()
    
    return jsonify(address_details.serialize()), 200


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
# obtener categorias

@api.route('/categories', methods=['GET'])
def get_all_categories():
    all_categories = Category.query.all()
    result = list(map(lambda category: category.serialize() ,all_categories))

    return jsonify(result), 200

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

@api.route('/all_services', methods=['GET'])
@jwt_required()
def get_all_services():

    all_services = Services.query.all()
    print(all_services)
    result = list(map(lambda item: item.serialize(), all_services))
  
    print(result)
    return jsonify(result), 200 

@api.route('/get_petitioner_services', methods=['GET'])
@jwt_required()
def get_petitioner_services():
    current_user = get_jwt_identity()
    all_services = Services.query.filter_by(petitioner_id=current_user).all()
    result = list(map(lambda item: item.serialize(), all_services))

    return jsonify(result), 200 

@api.route('/petitioner_services/<int:service_id>', methods=['GET'])
@jwt_required()
def get_petitioner_service(service_id):
    offerer_data = OffererServices.query.filter_by(service_id=service_id).all()
    result_price = list(map(lambda item: item.price, offerer_data))
    offerer_asigned = OffererServices.query.filter_by(service_id=service_id, status='asigned')
    result_offerer_asigned = list(map(lambda item: item.offerer_id, offerer_asigned))
    # for i in result: 
    #     offerer = Offerer.query.get(i.offerer_id)
    #     all_offerer_details.append({'id': offerer.id, 'name': offerer.name, "status": i.status, "price": price})
    print(result_offerer_asigned)
    print(result_price)
    price = result_price[0]
    print(price)
    all_offerer_details = []
    all_service_details = []
    for i in offerer_data: 
        offerer = Offerer.query.get(i.offerer_id)
        all_offerer_details.append({'id': offerer.id, 'name': offerer.name, "status": i.status, "price": price})

    service = Services.query.get(service_id)
    category = Category.query.get(service.category_id)
    # all_service_details.append({'service_name':service.name, 'service_category': category.category, 'service_date': service.date, 'service_description': service.description, 'offerer_data': all_offerer_details})
    all_service_details = {'service_id': service_id, 'service_name':service.name, 'service_category': category.category, 'service_date': service.date, 'service_description': service.description, 'offerer_data': all_offerer_details, 'offerers': all_offerer_details, 'offerer_asigned': result_offerer_asigned }

    print (all_offerer_details)

    return jsonify(all_service_details), 200 

@api.route('/offerer_services', methods=['GET'])
@jwt_required()
def get_offerer_services():
    current_user = get_jwt_identity()

    all_services = OffererServices.query.filter_by(offerer_id=current_user).all()
    asigned_services = OffererServices.query.filter_by(offerer_id=current_user, status='asigned').all()
    print(asigned_services)
    all_services_details = []
    for i in all_services: 
        servicio = Services.query.get(i.service_id)
        all_services_details.append({'id': servicio.id, 'name': servicio.name, 'category': servicio.category_id, 'description': servicio.description, 'date':servicio.date, 'status': servicio.status, 'petitioner_id': servicio.petitioner_id})

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

@api.route('/add_services', methods =['POST'])
@jwt_required()
def add_service():
    
    print("band 1")
    current_user = get_jwt_identity()
    body = request.get_json()
    print(body)
    print("band 2")
    print(current_user)
    print("band 3")
    service = Services(
        name = body['name'],
        category_id = body['category_id'],
        description = body['description'],
        date = body['date'],
        status = 'evaluating_proposal',
        petitioner_id = current_user,
        address_id = body['address_id'] 
    )
    print("band 4")
    print(service)
    db.session.add(service)
    try:
        db.session.commit()
    except Exception as error:
        print(error)

    response_body = {
        "message": "Service created"
    }
    
    return jsonify(response_body), 200

@api.route('/add_offerer_service', methods =['POST'])
@jwt_required()
def add_offerer_service():
    print("band 0")
    current_user = get_jwt_identity()
    print("band 1")
    body = request.get_json()
    print("band 2")
    service = OffererServices(
    offerer_id = current_user,
    service_id = body["service_id"],
    status = 'pending_approval',
    price = body["price"])
    print("band 3")
    print("band 3.1")
    db.session.add(service)
    
    db.session.commit()
    print("band 4")
    response_body = {
        "message": "Service created"
    }
    print("band 5")

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
    delete_service_offerer_services = OffererServices.query.filter_by(id=service_id).first()

    print(delete_service)
    print(delete_service_offerer_services)

    if delete_service_offerer_services != None:
        db.session.delete(delete_service_offerer_services)

    db.session.delete(delete_service)
    db.session.commit()

    response_body = {
        "message": "Service deleted"
    }
      
    return jsonify(response_body), 200

@api.route('/service/<int:service_id>', methods =['DELETE'])
@jwt_required()
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

@api.route('/service_status_update_evaluating_proposal/<int:service_id>', methods=['PUT'])
@jwt_required()

def service_status_update_evaluating_proposal(service_id):

    services_by_status = Services.query.filter_by(id=service_id).first()
    
    services_by_status.status == 'evaluating_proposal'
   
    db.session.commit()

    response_body = {
        "message": "Service status updated"
    }
      
    return jsonify(response_body), 200

@api.route('/service_status_update/<int:service_id>', methods=['PUT'])
@jwt_required()

def update_service_status(service_id):

    # offerer_by_service_id = OffererServices.query.filter_by(service_id=service_id).all()
    # print(offerer_by_service_id)

    services_by_status = Services.query.filter_by(id=service_id).first()
    
    if services_by_status.status == 'finished':
        return jsonify({"message": "Status is 'finished', can't change it"}), 400
    if services_by_status.status == 'asigned':
        services_by_status.status = 'finished'
        #agregar opción de status insuficient
    if services_by_status.status == 'evaluating_proposal':
        services_by_status.status = 'asigned'
    if services_by_status.status == 'open':
        services_by_status.status = 'evaluating_proposal'
    
    # service_asigned = Services.query.filter_by(status='asigned').first()
    # service_id = service_asigned.id
    # print(service_id)
    # # offerer_asigned = OffererServices.query.filter_by(service_id=service_id, status = 'asigned')
    db.session.commit()

    response_body = {
        "message": "Service status updated"
    }
      
    return jsonify(response_body), 200

@api.route('/service_status_update_offerer/<int:service_id>', methods=['PUT'])
@jwt_required()

def update_service_status_offerer(service_id):

    offerer_id = get_jwt_identity()
  
    services_by_offerer_id = OffererServices.query.filter_by(offerer_id=offerer_id,service_id=service_id).first()
    print(services_by_offerer_id)

    if services_by_offerer_id.status == 'finished':
        return jsonify({"message": "Status is 'finished', can't change it"}), 400
    if services_by_offerer_id.status == 'asigned':
        services_by_offerer_id.status = 'finished'
    if services_by_offerer_id.status == 'pending_approval':
        services_by_offerer_id.status = 'asigned'

    db.session.commit()

    response_body = {
        "message": "Service status updated"
    }
      
    return jsonify(response_body), 200

@api.route('/service_status_update_offerer_petitioner_view/<int:service_id>/<int:offerer_id>', methods=['PUT'])
@jwt_required()

def service_status_update_offerer_petitioner_view(service_id,offerer_id):
  
    services_by_offerer_id = OffererServices.query.filter_by(offerer_id=offerer_id,service_id=service_id).first()
    print(services_by_offerer_id)

    if services_by_offerer_id.status == 'finished':
        return jsonify({"message": "Status is 'finished', can't change it"}), 400
    if services_by_offerer_id.status == 'asigned':
        services_by_offerer_id.status = 'finished'
    if services_by_offerer_id.status == 'pending_approval':
        services_by_offerer_id.status = 'asigned'

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
    petitioner = Petitioner.query.filter_by(email=body["email"]).first()

    print("band1")
    print(body)
    print("band2")
    print("band3")
   
    if petitioner == None:
        petitioner = Petitioner(name=body["name"], email=body["email"], password=body["password"])
        print(petitioner)
        # petitioner_list=petitioner.serialize()
        # print(petitioner_list)
        print("band4")
        db.session.add(petitioner)
        db.session.commit()
        # print(petitioner.id)
        
        print("band5")
        petitioner_info = petitioner.serialize()
        print(petitioner_info["id"])
        access_token = create_access_token(identity=petitioner_info["id"])
        print(access_token)
        petitioner_info['access_token']=access_token
        # response_body = {

        #     "msg": "Petitioner created",
        #     "token": petitioner_info
        # }
        print(petitioner_info)
        return jsonify(petitioner_info), 200
    else:
        return jsonify({"msg": "Petitioner already exists with this email address"}), 401
    

@api.route("/signup_offerer", methods=["POST"])
def signup_offerer():
    body = request.get_json()
    offerer = Offerer.query.filter_by(email=body["email"]).first()

    print("band1")
    print(body)
    print("band2")

    if offerer == None:
        offerer = Offerer(name=body["name"], email=body["email"], password=body["password"])
        print(offerer)
        db.session.add(offerer)
        db.session.commit()
        offerer_info = offerer.serialize()
        print("band4")
        print(offerer_info["id"])
        access_token = create_access_token(identity=offerer_info["id"])
        print(access_token)
        print("band5")
        offerer_info['access_token']=access_token
        # response_body = {

        #     "msg": "Offerer created",
        #     "token": offerer_info
        # }
        return jsonify(offerer_info), 200
    else:
        return jsonify({"msg": "Offerer already exists with this email address"}), 401
    
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