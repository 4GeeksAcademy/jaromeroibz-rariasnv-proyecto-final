import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import { EditAddress } from "./editaddress";
import { AddressList } from "./addressList";
// import "../../styles.demo.css";

export const Address = () => {
    const { store, actions } = useContext(Context);
    const theid = useParams().theid
    const result = store.addresses.find((item) => item.id == theid )
    console.log(result)

    useEffect(() => {
        actions.getAddress(result)
    }, [])

    return (
    
        <div className="container">
			<h1 className="py-3">Address</h1>
            <div className="list-group-item d-flex">
                <img src="https://picsum.photos/200" alt=""></img>
                <div className="d-block px-5">
                    <h1>{result.name}</h1>
                    <p className="info">{result.full_address}</p>
                    <p className="info">{result.city}</p>
                    {/* <p className="info">{result.county}</p>
                    <p className="info">{item.state}</p>
                    <p className="info">{item.details}</p>
                    <p className="info">{item.zipcode}</p>
                    <p className="info">{item.latitude}</p>
                    <p className="info">{item.longitude}</p> */}

                </div>
                <div className="pencontainer">
                    <Link to={`/editaddress/${result.id}`}>
                        Edit
                    </Link>
                </div>
                <div className="trashcan px-5">
                    <button onClick= { () => actions.saveToDelete(result.id) } type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete contact</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete this contact?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <Link to="/addresslist">
                                <button onClick={ () => actions.deleteAddress(result)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>	
			</div>
            <Link to="/addressform">
				<button className="btn btn-primary">Add address</button>
			</Link>
            <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
	    </div>
    )


}