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
                <div className="d-block px-5">
                    <h1>Check the details:</h1>
                    Name:
                    <p className="info">{store.serviceDetails.service_name}</p>
                    Category:
                    <p className="info">{store.serviceDetails.service_category}</p>
                    Date:
                    <p className="info">{store.serviceDetails.service_date}</p>
                    Description:
                    <p className="info">{store.serviceDetails.service_description}</p>
                    Offerer:
                    <p className="info">{store.serviceDetails.offerer_data[0].name}</p>


                </div>               
                <div>
                    <Link to='/servicelistofferer'>
                        Apply to another service
                    </Link>
                </div>
		</div>
    )


}