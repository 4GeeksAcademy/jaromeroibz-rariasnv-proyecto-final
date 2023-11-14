import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegisteredOffererDetail = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const params = useParams()
    const [detail, setDetail] = useState({})

    const findOfferer = () => {
        let result = store.offerers.find( (offerer) => offerer.id == params.offererId )
        setDetail(result)
        actions.getOfferer(result)
    }
    useEffect( () => {
        findOfferer()
    },[store.offerers])

    return(
        <div className="body m-5">            
            <div className="card" style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">Full Name: {detail?.full_name} </h6>
                <p className="card-text">Phone number: {detail?.phone_number} </p>
                <p className="card-text">Address: {detail?.address} </p>
                <p className="card-text">Email address: {detail?.email_address} </p>
                <p className="card-text">Tasks offer: {detail?.tasks_offer} </p>
                <p className="card-text">Rating: {detail?.rating} </p>
                
                <button className="btn btn-primary" onClick={ () => navigate('/registeredOfferers') } >Back</button>                    
            </div>
            </div>           
        </div>

    )
}