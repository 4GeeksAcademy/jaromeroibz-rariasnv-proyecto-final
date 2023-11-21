import React, { useState, useEffect, useContext } from "react";
import { Link, useResolvedPath } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
		actions.getPetitionerServices()
    }, [])

    return (
    
        <div className="container">
			<>
			<ul className="list-group py-5">
			<h1 className="py-3">Service List</h1>
			{store.services.map((item) => 
				
					<li key= {item.id}
						className="list-group-item d-flex"
						>
						<img src="https://picsum.photos/200" alt=""></img>
						<div className="d-block px-5">
                            <h1>{item.name}</h1>
							Date:
                            <p className="info">{item.date}</p>
							Category:
                            <p className="info">{item.category}</p>
							Description:
                            <p className="info">{item.description}</p>

						</div>
						<div className="container">
                            <Link to={`/service/${item.id}`}>
                                See details
                            </Link>
						</div>
						<div className="pencontainer">
                            <Link to={`/editservice/${item.id}`}>
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
					</li>
			)}
			</ul>
			<br />
			</>
			<Link to="/serviceform">
				<button className="btn btn-primary">Add service</button>
			</Link>
		</div>
    )


}