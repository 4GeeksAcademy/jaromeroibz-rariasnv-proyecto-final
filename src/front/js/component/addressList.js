import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
import locationImageUrl from "../../img/location-icon.png"
// import "../../styles.demo.css";

export const AddressList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAddresses()
		actions.getAddressesDetails()
    }, [])

    return (
    
        <div className="container">
			<ul className="list-group py-5">
			<h1 className="py-3">Address List</h1>
			{store.addresses.map((item) => 
				
					<li key= {item.id}
						className="list-group-item d-flex"
						>
						<img src={locationImageUrl} width="100" height="100" />
						<div className="d-block px-5">
                            <h1>{item.name}</h1>
                            <p className="info">{item.full_address}</p>
							
                            {/* <p className="info">{item.city}</p>
                            <p className="info">{item.county}</p>
                            <p className="info">{item.state}</p>
                            <p className="info">{item.details}</p>
                            <p className="info">{item.zipcode}</p>
                            <p className="info">{item.latitude}</p>
                            <p className="info">{item.longitude}</p> */}

						</div>
						<div className="container">
                            <Link to={`/address/${item.id}`}>
                                See details
                            </Link>
						</div>
						<div className="pencontainer">
                            <Link to={`/editaddress/${item.id}`}>
                                Edit
                            </Link>
						</div>
						<div className="trashcan px-5">
							<button onClick= { () => actions.saveToDelete(item.id) } type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
										<button onClick={ () => {
											actions.deleteAddress(item)
											actions.deleteAddressDetail(item)
											}} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
									</div>
									</div>
								</div>
							</div>
						</div>	
					</li>
			)}
			</ul>
			<br />
			<Link to="/addressform">
				<button className="btn btn-primary">Add address</button>
			</Link>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
    )


}