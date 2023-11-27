import React, {useState, useEffect, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegisteredPetitionerDetail = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const [detail, setDetail] = useState({})
    const params = useParams()

    const findPetitioner = () => {
        let result = store.petitioners.find( (petitioner) => petitioner.id == params.theId )  
        setDetail(result)
        actions.getPetitioner(result)
    }       
        
    useEffect( () => {
        findPetitioner()        
    },[store.petitioners])

    return (
        <div className="petitionerdetail container">
            <div>            
                <div className="body m-5">            
                    <div className="card" style={{width: "18rem"}}>
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-body-secondary">Full Name: {detail?.full_name}</h6>
                        <p className="card-text">Phone number: {detail?.phone_number}</p>
                        <p className="card-text">Address: {detail?.address}</p>
                        <p className="card-text">Email address: {detail?.email_address}</p>
                        <p className="card-text">Offer: {detail?.offer_services}</p>
                        <p className="card-text">Rating: {detail?.rating}</p>

                        
                        <button className="btn btn-primary" onClick={ () => navigate('/registeredPetitioners')}>Back</button>                    
                        <button className="btn btn-danger mx-2">Delete</button>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}