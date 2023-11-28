import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import { EditAddress } from "./editaddress";
import { AddressList } from "./addressList";
import {ServiceConfirmation} from "./serviceconfirmation";

// import "../../styles.demo.css";

export const Service = () => {
    const { store, actions } = useContext(Context);
    const theid = useParams().theid
    console.log(theid)
    // const result = store.serviceDetails.find((item) => item.id = theid)
    // console.log(result)
    console.log(store.serviceDetails.offerers)
    const navigate = useNavigate()
    // const offerer_data = store.serviceDetails.offerers?.find((item)=> item.id

    useEffect(() => {
        actions.getServiceDetails(theid)
    }, [])

    function updateStatus (offererId) {
		actions.updateStatusPetitioner(theid)
        // actions.updateServiceStatusOfferer(theid)
        actions.updateServiceStatusOffererPetitionerView(theid, offererId)     
        navigate('/serviceconfirmation/'+theid)		
	}

    return (

          <div className="container">
            <h1 className="py-3">Service Details</h1>
            {store.petitionerServices.map((item) => 
                    <div className="cardserviceslist card-body servicelist-item my-1 my-3" >
                      <h3 className="h5">Task: {store.serviceDetails.service_name} </h3>
                      <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center position-relative me-3">
							<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
							<div>
								<p>description: {store.serviceDetails.service_description}</p>
								<span>Category: {store.serviceDetails.service_category}</span>
                                <p>date: {store.serviceDetails.service_date}</p>
							</div>
                        </div>
                        <div className="d-flex align-items-center mt-sm-0 mt-4">
                          <div className="d-flex align-items-center me-3">
                            {store.serviceDetails.offerers?.map((item)=>
                            <>
                                <div className="bx bx-share-alt fs-lg me-1" key={item.id}> 
                                    <p>{item.name}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="bx bx-share-alt fs-lg me-1">
                                    <button className="btn btn-primary" onClick= {() => updateStatus(item.id)}>Asign</button>
                                </div>
                            </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
					)}
            <Link to="/serviceform">
				<button className="btn btn-primary">Add service</button>
			</Link>
            <Link to="/servicelist">
				<button className="btn btn-primary">Back to service list</button>
			</Link> 
	    </div>            

      
    )


}