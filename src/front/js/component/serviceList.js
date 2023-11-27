import React, { useState, useEffect, useContext } from "react";
import { Link, useResolvedPath } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
		actions.getPetitionerServices()
		actions.getCategories()
		actions.getOffererServices()
    }, [])

    return (
    
        <div className="container">
			<>
			<ul className="list-group py-5">
			<h1 className="py-3">Service List</h1>

			{store.petitionerServices.map((item) => 
                    <div className="cardserviceslist card-body servicelist-item my-1 my-3" key= {item.id} >
                      <h3 className="h5">Task: {item.name} </h3>
                      <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center position-relative me-3">
							<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
							<div>
								<p>description: {item.description}</p>
								<span className="fs-sm text-muted">Category: {item.category_id}</span>
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

			{/* {store.petitionerServices.map((item) => 
				
					<li key= {item.id}
						className="list-group-item d-flex"
						>
						<img src="https://picsum.photos/200" alt=""></img>
						<h1>{item.name}</h1>
						<div className="d-block px-5">
							Date:
                            <p className="info">{item.date}</p>
							Category:
                            <p className="info">{item.category_id}</p>
							Description:
                            <p className="info">{item.description}</p>
							Status:
                            <p className="info">{item.status}</p>							
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
							Cancel
							</button>

							<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="exampleModalLabel">Cancel service</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Are you sure to cancel this service?
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button onClick={ () => actions.deletePetitionerService(item.id)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Cancel</button>
									</div>
									</div>
								</div>
							</div>
						</div>	
					</li>
			)} */}
			</ul>
			<br />
			</>
			<Link to="/serviceform">
				<button className="btn btn-primary">Add service</button>
			</Link>
		</div>
		)



    // return (    
    //     <div className="container">			
	// 		<div className="row g-0">
    //               <div className="col-sm-7 servicelist p-3">
	// 			  	{store.services.map((item) => 
    //                 <div className="cardserviceslist card-body servicelist-item my-1 my-3" key= {item.id} >
    //                   <h3 className="h5">Task: {item.name} </h3>
    //                   <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
    //                     <div className="d-flex align-items-center position-relative me-3">
	// 						<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
	// 						<div>
	// 							<p>description: {item.description}</p>
	// 							<span className="fs-sm text-muted">Category: {item.category}</span>
	// 						</div>
    //                     </div>
    //                     <div className="d-flex align-items-center mt-sm-0 mt-4 text-muted">
    //                       <div className="d-flex align-items-center me-3">
	// 						<div className="bx bx-share-alt fs-lg me-1">
	// 							<Link className="fs-sm" to={`/service/${item.id}`}>
	// 								<button className="btn btn-primary">Task details</button>
	// 							</Link>
	// 						</div>
    //                       </div>
	// 					  <div className="d-flex align-items-center me-3">
	// 						<div className="bx bx-share-alt fs-lg me-1">
	// 							<Link to={`/editservice/${item.id}`}>									
	// 								<button className="btn btn-primary">Edit</button>
	// 							</Link>
	// 						</div>
    //                       </div>
	// 					  <div className="d-flex align-items-center me-3">
	// 						<div className="bx bx-share-alt fs-lg me-1">
	// 							<button onClick= { () => actions.saveToDelete(item.id) } type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
	// 								Delete
	// 							</button>

	// 							<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	// 								<div className="modal-dialog">
	// 									<div className="modal-content">
	// 									<div className="modal-header">
	// 										<h1 className="modal-title fs-5" id="exampleModalLabel">Delete service</h1>
	// 										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	// 									</div>
	// 									<div className="modal-body">
	// 										Are you sure to delete this service?
	// 									</div>
	// 									<div className="modal-footer">
	// 										<button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
	// 										<button onClick={ () => actions.deleteService(item)} type="button" data-bs-dismiss="modal" className="btn btn-primary mx-2">Delete</button>
	// 									</div>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
    //                       </div>                         
    //                     </div>
    //                   </div>
    //                 </div>
	// 				)}
	// 				<div className="my-3">
	// 					<Link to="/serviceform">
	// 						<button className="btn btn-primary mx-2">Add task</button>
	// 					</Link>
	// 				</div>
    //               </div>
    //             </div>

			
			
	// 	</div>
    
}