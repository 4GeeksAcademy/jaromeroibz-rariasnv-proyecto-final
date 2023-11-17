import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getServices()
    }, [])

    return (    
        <div className="container servicelist">
			
			<div className="row g-0">
                  <div className="col-sm-7">
				  	{store.services.map((item) => 
                    <div className="card-body servicelist-item my-1" key= {item.id} style={{border: "solid", borderRadius: "5px"}}>
                      <h3 className="h5">Task: {item.name} </h3>
                      <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center position-relative me-3">
						<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
                          <div>
                            <p>description: {item.description}</p>
                            <span className="fs-sm text-muted">Category: {item.category}</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-sm-0 mt-4 text-muted">
                          <div className="d-flex align-items-center me-3">
							<div className="bx bx-share-alt fs-lg me-1">
								<Link className="fs-sm" to={`/service/${item.id}`}>
									<button className="btn btn-primary">Task details</button>
								</Link>
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
							<div className="bx bx-share-alt fs-lg me-1">
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
											<button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
											<button onClick={ () => actions.deleteService(item)} type="button" data-bs-dismiss="modal" className="btn btn-primary mx-2">Delete</button>
										</div>
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
				<Link to="/serviceform">
					<button className="btn btn-primary mx-2">Add task</button>
				</Link>
			</div>
			
		</div>
    )
}