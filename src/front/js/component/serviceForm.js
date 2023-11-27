import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

// import "../../styles/demo.css";

export const ServiceForm = (item) => {
	const { store, actions } = useContext(Context);
	
	useEffect(() => {
		actions.getCategories()
    }, [])

 	const [service,setService] = useState({
		"name": "",
    	"category_id": "",
    	"description": "",
		"date": ""
	});
	
	function handleChange (event){
		setService({
			...service,
			[event.target.name]:event.target.value
		})
	}

	function saveService() {
		console.log(service)
		actions.addService(service)
		actions.getPetitionerServices()
		setService(
			{
                "name": "",
                "category_id": "",
                "description": "",
				"date": ""
			}
		)
	}
	
	return (
		<div className="container">
			<h1>Book your task</h1>
			<form>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={service.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Fix a wall" required />
  				</div>
                <div className="form-group py-3">
                    <label>Select a category</label>
						<select value={service.category_id} onChange={handleChange} name='category_id' className="form-select" aria-label="Default select example" required>
						<option selected>Select a category</option>
							{store.categories.map((item) => 
							<option key = {item.id} value= {item.id}>{item.category}</option>
								)}
						</select>
				
                </div>
				<div className="form-group py-3">
    				<label>Date</label>
   					<input value={service.date} onChange={handleChange} name='date' type="text" className="form-control" id="date" placeholder="DD/MM/YY" required />
  				</div>
                <div className="form-group py-3">
                    <label htmlFor="description">Example textarea</label>
                    <textarea value={service.description} onChange={handleChange} name='description' className="form-control" id="description" placeholder="Please describe the task" rows="3" required/>
                </div>
				<Link to="/servicelist">
				<button onClick={() => saveService()} type="button" className="btn btn-primary py-3">Post service</button>
				</Link>
			</form>
			<br />
			<Link to="/servicelist">
				<button className="btn btn-primary">Service List</button>
			</Link>
		</div>
	);
}