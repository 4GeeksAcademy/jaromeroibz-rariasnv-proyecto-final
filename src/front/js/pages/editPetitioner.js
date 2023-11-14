import React, {useState, useEffect, useContext} from "react";
import { Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditPetitioner = () => {
    const navigate = useNavigate()
    const {idToEdit} = useParams()
    const {store, actions} = useContext(Context)
    const [petitionerToEdit, setpetitionerToEdit ] = useState({
        "full_name": "", 
        "phone_number": "",
        "address": "",
        "email_address": "",
        "offer_services": "",
        "rating": "",
        "password": ""
    });

    function handleChange(event) {
        setpetitionerToEdit({
            ...petitionerToEdit,
            [event.target.name]: event.target.value
        })
    }

    function getPetitionerToEdit() {
        const result = store.petitioners.find( (petitioner)=> petitioner.id == idToEdit )
        setpetitionerToEdit(
            {
                "full_name": result.full_name, 
                "phone_number": result.phone_number,
                "address": result.address,
                "email_address": result.email_address,
                "offer_services": result.offer_services,
                "rating": result.rating,
                "password": result.password
            }
        )
    }   console.log(setpetitionerToEdit)

    useEffect( () => {getPetitionerToEdit()},[])

    return(
        <div className="body m-5">
            <form>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName"
                value={petitionerToEdit.full_name} onChange={handleChange} name="full_name" 
                placeholder="Enter full name" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input type="number" className="form-control" id="phoneNumber"
                value={petitionerToEdit.phone_number} onChange={handleChange} name="phone_number" 
                placeholder="Enter phone number" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" id="address"
                value={petitionerToEdit.address} onChange={handleChange} name="address"
                placeholder="Enter address" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email_address"
                value={petitionerToEdit.email_address} onChange={handleChange} name="email_address"
                placeholder="Enter email address" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                value={petitionerToEdit.password} onChange={handleChange} name="password"
                placeholder="Enter password" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Services you offer</label>
                <input type="text" className="form-control" id="offer_services"
                value={petitionerToEdit.offer_services} onChange={handleChange} name="offer_services"
                placeholder="Enter the services you offer" required/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Rate yourself</label>
                <input type="number" className="form-control" id="rating"
                value={petitionerToEdit.rating} onChange={handleChange} name="rating"
                placeholder="Rate yourself for now" required/>
            </div>
            <Link to="/registeredPetitioners">
            <button className="btn btn-primary mx-2" type="button" onClick={ () => actions.editPetitioner(petitionerToEdit,idToEdit) }>Update petitioner</button>
            </Link>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Back</button>
            </form>
        </div>
    )
}