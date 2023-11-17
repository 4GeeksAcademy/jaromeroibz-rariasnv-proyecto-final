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
		// actions.getServiceCategory()
 
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
		<div className="container serviceform">
			<h1 className="mx-2">Book your task</h1>
			<form>
                <div className="form-group py-3 mx-2">
    				<label>What do you need help with?</label>
   					<input value={service.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="Example: Paint a wall" required />
  				</div>
                <div className="form-group py-3 mx-2">
                    <label>Choose category</label>
						<select value={service.category} onChange={handleChange} name='category' className="form-select" aria-label="Default select example" required>
							{store.categories.map((item) => 
							<option value= {item.category}>{item.category}</option>
								)}
						</select>
				
                </div>
                <div className="form-group py-3 mx-2">
                    <label htmlFor="description">Give us details about the task</label>
                    <textarea value={service.description} onChange={handleChange} name='description' className="form-control" id="description" placeholder="Please describe the task" rows="3" required/>
                </div>				
			</form>
			<div className="">
				<Link to="/servicelist">
					<button onClick={() => saveService()} type="button" className="btn btn-primary mx-2">Post service</button>
				</Link>
				<Link to="/servicelist">
					<button className="btn btn-primary mx-2">Back home</button>
				</Link>
			</div>
			
		</div>
	);
}