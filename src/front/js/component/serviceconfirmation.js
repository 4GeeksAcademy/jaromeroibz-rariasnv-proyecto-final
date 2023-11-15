import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceConfirmation = () => {
    const { store, actions } = useContext(Context);
    const theid = useParams().theid
    console.log(theid)
    const result = store.services.find((item) => item.id == theid )
    console.log(result)
    useEffect(() => {
        actions.getServices(result)
    }, [])

    return (
    
        <div className="container">
			<h1 className="py-3">Service accepted</h1>
                <div className="d-block px-5">
                    <h1>Check the details:</h1>
                    <p className="info">{result.name}</p>
                    <p className="info">{result.category}</p>
                    <p className="info">{result.date}</p>
                    <p className="info">{result.description}</p>
                </div>
                <div>
                    <Link to='/applytoservice'>
                        Apply to another service
                    </Link>
                </div>
		</div>
    )


}