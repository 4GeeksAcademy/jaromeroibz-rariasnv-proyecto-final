import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegisteredPetitioners = () => {
    const navigate = useNavigate()
    return (
        <div className="body m-5">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Petitioner ID: </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Full Name</h6>
                    <p className="card-text">Phone number: </p>                    
                    <p className="card-text">Email address: </p>
                    
                    <button className="btn btn-primary" onClick={ () => navigate('/registeredPetitioners/:theId') }>Petitoner details</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                </div>
            </div>
        </div>
    )
}