import React,{useState,useEffect,useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate,useParams } from "react-router-dom";

export const EditOfferer = () => {
    const {offererIdToEdit} = useParams()
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [offererToEdit, setOffererToEdit] = useState({
        "full_name": "",
        "phone_number": "",
        "address": "",
        "email_address": "",
        "password": "",
        "tasks_offer": "",
        "rating": "" 
    });

    function handleChange(event) {
        setOffererToEdit({
            ...offererToEdit,
            [event.target.name]: event.target.value
        })
    };

    function getOffererToEdit(){
        const result = store.offerers.find( (offerer) => offerer.id == offererIdToEdit)
        setOffererToEdit({
            "full_name": result.full_name,
            "phone_number": result.phone_number,
            "address": result.address,
            "email_address": result.email_address,
            "password": result.password,
            "tasks_offer": result.tasks_offer,
            "rating": result.rating 
        })
    }

    useEffect( () => {getOffererToEdit()}, [] )

    return(
        <div className="body m-5">
            <form>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName"
                value={offererToEdit.full_name} onChange={handleChange} name="full_name" 
                placeholder="Enter full name" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input type="number" className="form-control" id="phoneNumber"
                value={offererToEdit.phone_number} onChange={handleChange} name="phone_number" 
                placeholder="Enter phone number" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" id="address"
                value={offererToEdit.address} onChange={handleChange} name="address"
                placeholder="Enter address" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email_address"
                value={offererToEdit.email_address} onChange={handleChange} name="email_address"
                placeholder="Enter email address" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                value={offererToEdit.password} onChange={handleChange} name="password"
                placeholder="Enter password" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Tasks you offer</label>
                <input type="text" className="form-control" id="tasks_offer"
                value={offererToEdit.tasks_offer} onChange={handleChange} name="tasks_offer"
                placeholder="Enter the tasks you offer" required/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Rate yourself</label>
                <input type="number" className="form-control" id="rating"
                value={offererToEdit.rating} onChange={handleChange} name="rating"
                placeholder="Rate yourself for now" required/>
            </div>
            <Link to="/registeredOfferers">
            <button className="btn btn-primary mx-2" type="button" onClick={ () => actions.editOfferer(offererToEdit, offererIdToEdit) }>Update offerer</button>
            </Link>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Back</button>
            </form>
        </div>
    )
}

