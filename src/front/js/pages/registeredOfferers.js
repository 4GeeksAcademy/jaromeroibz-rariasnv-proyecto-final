import React, {useState, useEffect, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegisteredOfferers = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    return(
        <div className="body m-5"> 
            {store.offerers && store.offerers.length > 0 && store.offerers.map( (offerer) => 
            <div className="card m-3" key={offerer.id} style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Full name: {offerer.full_name} </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Phone number: {offerer.phone_number} </h6>
                <p className="card-text">Email address: {offerer.email_address} </p>

                <button className="btn btn-primary" onClick={ () => navigate(`/registeredOfferers/${offerer.id}`) } >Offerer details</button>
                <button className="btn btn-primary" onClick={ () => navigate(`/editOfferer/${offerer.id}`) }>Edit</button>
                <button className="btn btn-danger mx-2" onClick={ () => actions.deleteParticularOfferer(offerer) }>Delete</button>              
            </div>
            </div> 
        )}            
        </div>
    )
}