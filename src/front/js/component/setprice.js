import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import { EditAddress } from "./editaddress";
import { AddressList } from "./addressList";
import {ServiceConfirmation} from "./serviceconfirmation";

// import "../../styles.demo.css";

export const Price = () => {
    const { store, actions } = useContext(Context);
    const theid = useParams().theid
    console.log(theid)
    // const result = store.serviceDetails.find((item) => item.id = theid)
    // console.log(result)
    console.log(store.serviceDetails.offerers)
    const navigate = useNavigate()
    // const offerer_data = store.serviceDetails.offerers?.find((item)=> item.id
	
	const [price,setPrice] = useState('');
    
    useEffect(() => {
        actions.getServiceDetails(theid)
    }, [])

    console.log(store.allServices)

	function handleChange (event){
		setPrice(event.target.value);
	}

	function applyService (theid, price) {
		actions.addOffererService(theid, price)
		// actions.updateServiceStatusEvaluatingProposal(idService)
		const deleteService = store.allServices.find((item) => item.id == theid )
		const index = store.allServices.indexOf(deleteService)
		store.allServices.splice(index,1)
		console.log(price)
        navigate("/servicelistofferer")

	}

    return (

          <div className="container">
			<h1 className="py-3">Service Details</h1>
            <div className="list-group-item d-flex">
                <img src="https://picsum.photos/200" alt=""></img>
                <div className="d-block px-5">
                    <h1>{store.serviceDetails.service_name}</h1>
                    <p className="info">Category: {store.serviceDetails.service_category}</p>
                    <p className="info">Description: {store.serviceDetails.service_description}</p>
                    <p className="info">Date: {store.serviceDetails.service_date}</p>
                </div>
                <div className="d-block px-5">
                <h2>Apply to this service:</h2>
                    <div className="pencontainer">
							<label>Add a price for your service</label>
   								<input value={price} onChange={e=>handleChange(e)} name="price" type="text" className="form-control" placeholder="Add a price" required/>	
							<button onClick= { () => applyService(price) } type="button" className="btn btn-primary">Apply</button>
					</div>
                </div>

                {/* <div className="pencontainer">
                    <Link to={`/editservice/${result.id}`}>
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete service</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete this service?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <Link to="/servicelist">
                                <button onClick={ () => actions.deleteService(result)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>	  */}
			</div>
            {/* <Link to="/serviceform">
				<button className="btn btn-primary">Add service</button>
			</Link>*/}
            <Link to="/servicelist">
				<button className="btn btn-primary">Back to service list</button>
			</Link> 
	    </div>            

      
    )


}