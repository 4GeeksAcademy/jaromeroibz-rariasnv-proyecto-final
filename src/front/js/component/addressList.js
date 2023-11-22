import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
import { EditAddress } from "./editaddress";
// import "../../styles.demo.css";

export const AddressList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAddresses()
    }, [])

    return (
    
        <div className="container addresslist">
			<div className="row g-0">
				<div className="col-sm-7">	
					{store.addresses.map((item) => 		
						<div className="card-body servicelist-item my-1" key= {item.id} style={{border: "solid", borderRadius: "5px"}}>
							<h3 className="h5">Address name: {item.name}</h3>					
								<div key= {item.id} div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
									<div className="d-flex align-items-center position-relative me-3">
										<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"></img>
										<div className="">																							
												<p className="info">Full address: {item.full_address}</p>
												<p className="info">{item.state}</p>
										</div>	
									</div>
									<div className="d-flex align-items-center position-relative me-3">
										<div>
											<p className="info">{item.city}</p>
											<p className="info">{item.county}</p>
										</div>
									</div>
									<div className="d-flex align-items-center position-relative me-3">
										<div>
											<p className="info">{item.details}</p>
											<p className="info">{item.zipcode}</p>
											<p className="info">{item.latitude}</p>
											<p className="info">{item.longitude}</p>
										</div>
									</div>
									<div className="d-flex align-items-center me-3">
										<div className="bx bx-share-alt fs-lg me-1">
											<Link to={`/address/${item.id}`}>
												See details
											</Link>
										</div>
									</div>	
									<div className="d-flex align-items-center me-3">
										<div className="bx bx-share-alt fs-lg me-1">
											<Link to={`/editaddress/${item.id}`}>
												Edit
											</Link>
										</div>											
									</div>
									<div className="d-flex align-items-center me-3">
										<div className="bx bx-share-alt fs-lg me-1">
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
															<button onClick={ () => actions.deleteAddress(item)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
														</div>
														</div>
													</div>
												</div>
												</div>
											</div>
									</div>
						</div>
					)}
				</div>
			</div>

			<div className="my-3">
				<Link to="/addressform">
					<button className="btn btn-primary m-2">Add address</button>
				</Link>
				<Link to="/">
					<button className="btn btn-primary m-2">Back home</button>
				</Link>						
			</div>
			
		</div>
    )


}