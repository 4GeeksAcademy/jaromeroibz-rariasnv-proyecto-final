import React, { useState, useEffect, useContext, useSyncExternalStore } from "react";
import { Link, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceConfirmation = () => {
    const { store, actions } = useContext(Context);
    const theid = useParams().theid
    console.log(theid)
    const offerer_id= store.serviceDetails.offerer_asigned
    console.log(offerer_id)
    const offererAsigned = store.serviceDetails.offerers.find((item) => item.id == offerer_id )
    console.log(offererAsigned)
    
    //    console.log(result)

    useEffect(() => {
        actions.getServiceDetails(theid)
    }, [])

    return (
        
        <div className="container">
			<h1 className="py-3">Service accepted</h1>

            <div className="cardserviceslist card-body servicelist-item my-1 my-3">
                      <h3 className="h5">Name: {store.serviceDetails.service_name} </h3>
                      <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center position-relative me-3">
                                <img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
                                <div>
                                    <p>description: {store.serviceDetails.service_description}</p>
                                    <p>category: {store.serviceDetails.service_category}</p>
                                    <p>date: {store.serviceDetails.service_date}</p>
                                    <p>offerer: {store.serviceDetails.offerer_data[0].name}</p>
                                </div>
                            </div>
                        </div>               
                        <div>
                            <Link to='/serviceform'>
                                <button className="btn btn-primary">Add another task</button>
                            </Link>
                        </div>
            </div>
		</div>
    )


}