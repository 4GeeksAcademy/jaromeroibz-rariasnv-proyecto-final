import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ServiceListOfferer = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.getAllServices()
        actions.getOffererServices()
    }, [])
	
	const [price,setPrice] = useState('');

	function handleChange (event){
		setPrice(event.target.value);
	}

	function applyService (idService, price) {
		actions.addOffererService(idService, price)
		// actions.updateServiceStatusEvaluatingProposal(idService)
		const deleteService = store.allServices.find((item) => item.id == idService )
		const index = store.allServices.indexOf(deleteService)
		const x = store.allServices.splice(index,1)
		console.log(price)

	}

	// function cancelService (idService) {
	// 	// actions.deleteOffererService(idService)
	// 	const addService = store.allServices.find((item) => item.id == idService )
	// 	const index = store.offererServices.indexOf(addService)
	// 	const x = store.allServices.append(index,1)
	// }
    return (
    
        <div className="container">
			<ul className="list-group py-5">
			<h1 className="py-3">Service List</h1>
			<h2 className="py-3">Apply to a service:</h2>

			{store.allServices.map((item) => 
                    <div className="cardserviceslist card-body servicelist-item my-1 my-3" key= {item.id} >
                      <h3 className="h5">Task: {item.name} </h3>
                      <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center position-relative me-3">
							<img src="https://picsum.photos/200" className="rounded-circle me-3" width="48" alt="Avatar"/>
							<div>
								<p>description: {item.description}</p>
								<span className="fs-sm text-muted">Category: {item.category}</span>
								<p>status: {item.status}</p>
							</div>
                        </div>
                        <div className="d-flex align-items-center mt-sm-0 mt-4 text-muted">
                          <div className="d-flex align-items-center me-3">
							<div className="bx bx-share-alt fs-lg me-1">
								<Link className="fs-sm" to={`/setprice/${item.id}`}>
									<button className="btn btn-primary">Task details</button>
								</Link>
							</div>
                          </div>
						  <div className="d-flex align-items-center me-3">
                          </div>
						  <div className="d-flex align-items-center me-3">
							<div className="bx bx-share-alt fs-lg me-1">
							<input value={price} onChange={e=>handleChange(e)} name="price" type="text" className="form-control" placeholder="Add a price" required/>	
								<button onClick= { () => applyService(item.id, price) } type="button" className="btn btn-primary">
								Apply
								</button>
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
											<button onClick={ () => actions.deletePetitionerService(item.id)} type="button" data-bs-dismiss="modal" className="btn btn-primary mx-2">Delete</button>
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
			</ul>
			<h2 className="py-3">Services you applied to</h2>
			<ul className="list-group py-5">

			{store.offererServices.map((item) => 
                    <div className="cardserviceslist card-body servicelist-item my-1 my-3" key= {item.id} >
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
							<div className="pencontainer">
                            <p>Service Applied</p>
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
											<button onClick={ () => actions.deletePetitionerService(item.id)} type="button" data-bs-dismiss="modal" className="btn btn-primary mx-2">Delete</button>
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
			</ul>
			<br />
		</div>
    )


}