import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


// import "../../styles/demo.css";

export const ServiceForm = (item) => {
	const { store, actions } = useContext(Context);
	const [service,setService] = useState({
		"name": "",
    	"category": "",
    	"description": ""
	});

	function handleChange (event){
		setService({
			...service,
			[event.target.name]:event.target.value
		}) 
	}

	function saveService() {
		actions.addService(service)
		setService(
			{
                "name": "",
                "category": "",
                "description": ""
			}
		)
	}
	
	return (
		<div className="container">
			<form>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={service.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Fix a wall" required />
  				</div>
                <div className="form-group py-3">
                    <label>Select a category</label>
                    <select value={service.category} onChange={handleChange} name='category' className="form-select" aria-label="Default select example" required>
                        <option>Select a category</option>
                        <option value= "2">Category One</option>
                        <option value= "3">Category Two</option>
                        <option value= "4">Category Three</option>
                    </select>
                </div>
                <div className="form-group py-3">
                    <label htmlFor="description">Example textarea</label>
                    <textarea value={service.description} onChange={handleChange} name='description' className="form-control" id="description" placeholder="Please describe the task" rows="3" required/>
                </div>
		
				<Link to="/servicelist">
				<button onClick={() => saveService()} type="button" className="btn btn-primary py-3">Save Service</button>
				</Link>
			</form>
			<br />
			<Link to="/servicelist">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
}