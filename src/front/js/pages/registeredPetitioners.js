import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegisteredPetitioners = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    return (   
        <div className="container">  
        <div className="row g-0">
            <div className="col-sm-7 registeredpetitioners p-3">
                <h3 className="h5">Registered petitioners</h3>
                {store.petitioners && store.petitioners.length > 0 && store.petitioners.map( (petitioner) => 
                    <div className="cardregisteredpetitioners card-body servicelist-item my-3" key= {petitioner.id}>                   
                        
                        <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center position-relative me-3">
                                <img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
                                <div>
                                    <p className="card-title">Petitioner ID: {petitioner.id} </p>
                                    <p className="card-subtitle mb-2 text-body-secondary">Full Name: {petitioner.full_name}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-sm-0 mt-4">
                                <div className="d-flex align-items-center me-3">
                                    <div className="bx bx-share-alt fs-lg me-1">
                                        <p className="card-text">Phone number: {petitioner.phone_number} </p>                    
                                        <p className="card-text">Email address: {petitioner.email_address}</p>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
							<div className="d-flex align-items-center position-relative me-3">
                                <div className="bx bx-share-alt fs-lg me-1">
                                    <button className="btn btn-primary" onClick={ () => navigate(`/registeredPetitioners/${petitioner.id}`) }>Petitioner details</button>
                                </div>
                                <div className="bx bx-share-alt fs-lg me-1">
                                    <button className="btn btn-primary" onClick={ () => navigate(`/editPetitioner/${petitioner.id}`) }>Edit</button>                                    
                                </div>
                                <div className="bx bx-share-alt fs-lg me-1">
                                    <button className="btn btn-danger" onClick={ () => actions.deleteParticularPetitioner(petitioner)}>Delete</button>                                                                        
                                </div>
                                
                                
                                
							</div>
						</div>
                </div>                
                )}
            </div>
        </div>
        </div>   
    )
}