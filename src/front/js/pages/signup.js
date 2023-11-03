import React, {useState, useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const navigate = useNavigate()
    return(
        <div className="body m-5">
            <form>
            <div className="mb-3">
                <label for="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName"/>
            </div>
            <div className="mb-3">
                <label for="phoneNumber" className="form-label">Phone number</label>
                <input type="number" className="form-control" id="phoneNumber"/>
            </div>
            <div className="mb-3">
                <label for="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address"/>
            </div>
            <div className="mb-3">
                <label for="email_address" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email_address"/>
            </div>
            <div className="mb-3">
                <label for="offer_services" className="form-label">Services you offer</label>
                <input type="text" className="form-control" id="offer_services"/>
            </div>
            <div className="mb-3">
                <label for="rating" className="form-label">Rate yourself</label>
                <input type="number" className="form-control" id="rating"/>
            </div>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Signup</button>
            <button className="btn btn-primary mx-2" onClick={ () => navigate('/') }>Back</button>
            </form>
        </div>
    )
}