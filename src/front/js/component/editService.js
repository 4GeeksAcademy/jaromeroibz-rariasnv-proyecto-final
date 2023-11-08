import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { AddressList } from "./addressList.js";
// import "../../styles/demo.css";


export const EditService = () => {
	const { store, actions } = useContext(Context);
	const {editid} = useParams()
	const [service,setService] = useState(
        {
            "name": "",
            "category": "",
            "description": ""
        }
    );

	function handleChange (event){
		setService({
			...service,
			[event.target.name]:event.target.value
		}) 
	}

	function searchService () {
		
		const result = store.services.find((item) => item.id == editid )
		console.log(result)
		setService(result)
	}

	useEffect(() => {searchService()}, [])

	return (
		<div className="container">
			<form>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={service.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Fix a wall"></input>
  				</div>
                <div className="form-group py-3">
                    <label>Select a category</label>
                    <select value={service.category} onChange={handleChange} className="form-select" aria-label="Default select example">
                        <option>Select a category</option>
                        <option value= "2">Category One</option>
                        <option value= "3">Category Two</option>
                        <option value= "4">Category Three</option>
                    </select>
                </div>
                <div className="form-group py-3">
                    <label htmlFor="description">Example textarea</label>
                    <textarea value={service.description} onChange={handleChange} name='description' className="form-control" id="description" placeholder="Please describe the task" rows="3"></textarea>
                </div>
				
				<Link to="/servicelist">
				<button onClick={() => actions.editService(service, editid)} type="button" className="btn btn-primary py-3">Update Service</button>
				</Link>
			</form>
			<br />
			<Link to="/servicelist">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
}