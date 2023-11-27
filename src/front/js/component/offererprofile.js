import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const OffererProfile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getServices()
    }, [])

    return (    
        <div className="container">
			<div className="row g-0">
				<div className="col-sm-7 offererprofile p-3">
					<h3 className="py-3">Service list</h3>
					{store.services.map((item) => 				
						<div className="cardoffererprofile card-body servicelist-item my-3" key= {item.id}>	
							<h3 className="h5">{item.name}</h3>						
								<div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">									
									<div className="d-flex align-items-center position-relative me-3">
										<div>
											<p className="info">{item.category}</p>
											<p className="info">{item.description}</p>
										</div>
									</div>
									<div className="d-flex align-items-center mt-sm-0 mt-4 text-muted">
										<div className="d-flex align-items-center me-3">
											<div className="bx bx-share-alt fs-lg me-1">
												<Link to={`/service/${item.id}`}>
													<button className="btn btn-primary">See details</button>
												</Link>
											</div>
										</div>
									</div>
									<div className="d-flex align-items-center me-3">
										<div className="bx bx-share-alt fs-lg me-1">
											<Link to={`/editservice/${item.id}`}>
												<button className="btn btn-primary">Edit</button>
											</Link>
										</div>
									</div>
									<div className="d-flex align-items-center me-3">
										<button onClick= { () => actions.saveToDelete(item.id) } type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
										Delete
										</button>
										
											<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
												<div className="modal-dialog">
													<div className="modal-content">
													<div className="modal-header">
														<h1 className="modal-title fs-5" id="exampleModalLabel">Delete service</h1>
														<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div className="modal-body">
														Are you sure to delete this service?
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
														<button onClick={ () => actions.deleteService(item)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
													</div>
													</div>
												</div>
											</div>
									</div>
								</div>			
						</div>
					)}
					<div className="my-3">
						<Link to="/serviceform">
							<button className="btn btn-primary">Add service</button>
						</Link>
					</div>
			</div>	
			</div>
		</div>
    )


}