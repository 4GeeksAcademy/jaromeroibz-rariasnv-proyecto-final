import React, {useState, useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = (petitionerToBeAdded) => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const [petitionerToAdd, setpetitionerToAdd ] = useState({
        "full_name": "", 
        "phone_number": "",
        "address": "",
        "email_address": "",
        "offer_services": "",
        "rating": ""
    });    

    function savePetitionerToAdd(e) {
        e.preventDefault()
        actions.addPetitioner(petitionerToAdd)
        setpetitionerToAdd({            
            "full_name": "", 
            "phone_number": "",
            "address": "",
            "email_address": "",
            "offer_services": "",
            "rating": ""
        })
    };

    function handleChange(event){
        setpetitionerToAdd({
            ...petitionerToAdd,
            [event.target.name]: event.target.value            
        })
    }

    return(
        <div className="body m-5">
            <form>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName"
                value={petitionerToAdd.full_name} onChange={handleChange} name='full_name'
                placeholder="Enter full name"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input type="number" className="form-control" id="phoneNumber"
                value={petitionerToAdd.phone_number} onChange={handleChange} name='phone_number'
                placeholder="Enter phone number"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" id="address"
                value={petitionerToAdd.address} onChange={handleChange} name='address'
                placeholder="Enter address"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email_address"
                value={petitionerToAdd.email_address} onChange={handleChange} name='email_address'
                placeholder="Enter email address"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Services you offer</label>
                <input type="text" className="form-control" id="offer_services"
                value={petitionerToAdd.offer_services} onChange={handleChange} name='offer_services'
                placeholder="Enter the services you offer"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Rate yourself</label>
                <input type="number" className="form-control" id="rating"
                value={petitionerToAdd.rating} onChange={handleChange} name='rating'
                placeholder="Rate yourself for now"/>
            </div>
            <button className="btn btn-primary mx-2" onClick={ (e) => savePetitionerToAdd(e) }>Signup</button>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Back</button>
            </form>
        </div>
    )
}