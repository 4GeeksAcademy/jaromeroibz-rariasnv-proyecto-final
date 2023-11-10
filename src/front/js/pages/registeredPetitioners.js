import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegisteredPetitioners = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    return (        
        <div className="body m-5">
            {store.petitioners && store.petitioners.length > 0 && store.petitioners.map( (petitioner) => 
                <div className="card m-3" key={petitioner.id} style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Petitioner ID: {petitioner.id} </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Full Name: {petitioner.full_name}</h6>
                    <p className="card-text">Phone number: {petitioner.phone_number} </p>                    
                    <p className="card-text">Email address: {petitioner.email_address}</p>
                    
                    <button className="btn btn-primary" onClick={ () => navigate(`/registeredPetitioners/${petitioner.id}`) }>Petitioner details</button>
                    <button className="btn btn-primary" onClick={ () => navigate(`/editPetitioner/${petitioner.id}`) }>Edit</button>
                    <button className="btn btn-danger mx-2" onClick={ () => actions.deleteParticularPetitioner(petitioner)}>Delete</button>
                </div>
            </div>
            )}
            
        </div>
    )
}