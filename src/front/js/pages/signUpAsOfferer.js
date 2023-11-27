import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUpAsOfferer = (offererToBeAdded) => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [offererToAdd, setOffererToAdd] = useState({
        "full_name": "",
        "phone_number": "",
        "address": "",
        "email_address": "",
        "password": "",
        "tasks_offer": "",
        "rating": ""        
    });

    function saveOffererToAdd(e) {
        e.preventDefault()
        actions.addOfferer(offererToAdd)
        setOffererToAdd({
            "full_name": "",
            "phone_number": "",
            "address": "",
            "email_address": "",
            "password": "",
            "tasks_offer": "",
            "rating": ""  
        })
    };

    function handleChange(event){
        setOffererToAdd({
            ...offererToAdd,
            [event.target.name] : event.target.value
        })
    }

    return(
        <div className="body m-5">
            <form>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName"
                value={offererToAdd.full_name} onChange={handleChange} name='full_name'
                placeholder="Enter full name"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input type="number" className="form-control" id="phoneNumber"
                value={offererToAdd.phone_number} onChange={handleChange} name='phone_number'
                placeholder="Enter phone number"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" id="address"
                value={offererToAdd.address} onChange={handleChange} name='address'
                placeholder="Enter address"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email_address"
                value={offererToAdd.email_address} onChange={handleChange} name='email_address'
                placeholder="Enter email address"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                value={offererToAdd.password} onChange={handleChange} name='password'
                placeholder="Enter password"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Tasks you offer</label>
                <input type="text" className="form-control" id="tasks_offer"
                value={offererToAdd.tasks_offer} onChange={handleChange} name='tasks_offer'
                placeholder="Enter the tasks you offer"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Rate yourself</label>
                <input type="number" className="form-control" id="rating"
                value={offererToAdd.rating} onChange={handleChange} name='rating'
                placeholder="Rate yourself for now"/>
            </div>
            <button className="btn btn-primary mx-2" onClick={ (e) => saveOffererToAdd(e) }>Signup</button>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Back</button>
            </form>
        </div>
    )
}