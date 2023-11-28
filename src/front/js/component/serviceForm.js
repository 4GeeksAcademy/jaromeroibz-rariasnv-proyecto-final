import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

// import "../../styles/demo.css";

export const ServiceForm = (item) => {
	const { store, actions } = useContext(Context);
	
	useEffect(() => {
		actions.getCategories()
		actions.getAddresses()
    }, [])

 	const [service,setService] = useState({
		"name": "",
    	"category_id": "",
    	"description": "",
		"date": "",
		"address_id": ""
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
				"date": "",
				"address_id":""
			}
		)
	}
	
	return (
		<div className="container serviceform">
			<h1 className="mx-2">Book your task</h1>
			<form>
                <div className="form-group py-3 ">
    				<label>What do you need help with?</label>
   					<input value={service.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="Example: Paint a wall" required />
  				</div>
                <div className="form-group py-3 ">
					<label>Choose category</label>
						<select value={service.category_id} onChange={handleChange} name='category_id' className="form-select" aria-label="Default select example" required >
						<option selected>Select a category</option>
						{store.categories.map((item) => 
							<option key = {item.id} value= {item.id}>{item.category}</option>
								)}
						</select>
				</div>
				<div className="form-group py-3 ">
					<label>Choose location</label>
						<select value={service.address_id} onChange={handleChange} name='address_id' className="form-select" aria-label="Default select example" required >
						<option selected>Select an address</option>
						{store.addresses.map((item) => 
							<option key = {item.id} value= {item.id}>{item.name}</option>
								)}
						</select>
				</div>
				<div className="form-group py-3">
    				<label>Date</label>
   					<input value={service.date} onChange={handleChange} name='date' type="text" className="form-control" id="date" placeholder="DD/MM/YY" required />
  				</div>
                <div className="form-group py-3 ">
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