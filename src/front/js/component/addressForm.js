import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


// import "../../styles/demo.css";

export const AddressForm = (item) => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [address,setAddress] = useState({
		"name": "",
    	"state": "",
    	"city": "",
    	"county":"",
    	"full_address":"",
        "details": "",
    	"zipcode": "",
    	"latitude": "",
    	"longitude":""
	});

	function handleChange (event){
		setAddress({
			...address,
			[event.target.name]:event.target.value
		}) 
		console.log(address)
	}

	function saveAddress (e) {
		e.preventDefault()
		actions.addAddress(address)
		setAddress(
			{
                "name": "",
                "state": "",
                "city": "",
                "county":"",
                "full_address":"",
                "details": "",
                "zipcode": "",
                "latitude": "",
                "longitude":""
			}
		)
		navigate('/addresslist')
	}
	
	return (
		<div className="container addressform">
			<h1 className="mx-2">Address details</h1>
			<form onSubmit={(e) => saveAddress(e)}>
                <div className="form-group py-1 mx-2">
    				<label>Name</label>
   					<input value={address.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Home, Work, etc" required/>
  				</div>
				<div className="form-group py-1 mx-2">
    				<label>Full Address</label>
   					<input value={address.full_address} onChange={handleChange} name='full_address' type="text" className="form-control" id="full_address" placeholder="Enter Full Address" required/>
  				</div>
                
				<div className="row">
					<div className="form-group py-1 mx-2 col">
						<label>Select your state</label>
						<select value={address.state} onChange={handleChange} name='state' className="form-select" aria-label="Default select example" required>
							<option>Select your state</option>
							<option value= "2">State One</option>
							<option value= "3">State Two</option>
							<option value= "4">State Three</option>
						</select>
					</div>
					<div className="form-group py-1 mx-2 col">
						<label>City</label>
						<input value={address.city} onChange={handleChange} name='city' type="text" className="form-control" id="city" placeholder="Enter your city" required/>
					</div>
					<div className="form-group py-1 mx-2 col">
						<label>County</label>
						<input value={address.county} onChange={handleChange} name='county' type="text" className="form-control" id="county" placeholder="Enter your county" required/>
					</div>					
				</div>

				<div className="row">
					<div className="form-group py-1 mx-2 col">
						<label>More details</label>
						<input value={address.details} onChange={handleChange} name='details' type="text" className="form-control" id="details" placeholder="Apt #, Suite #, etc"></input>
					</div>
					<div className="form-group py-1 mx-2 col">
    					<label>Zipcode</label>
   						<input value={address.zipcode} onChange={handleChange} name='zipcode' type="number" className="form-control" id="zipcode" placeholder="Enter your zipcode" required/>
  					</div>
				</div>		

				<div className="row">
					<div className="form-group py-1 mx-2 col">
						<label>Latitude</label>
						<input value={address.latitude} onChange={handleChange} name='latitude' type="text" className="form-control" id="latitude" placeholder="Enter the latitude"></input>
					</div>
					<div className="form-group py-1 mx-2 col">
						<label>Longitude</label>
						<input value={address.longitude} onChange={handleChange} name='longitude' type="text" className="form-control" id="longitude" placeholder="Enter the longitude"></input>
					</div>
				</div>					
			</form>
				<div className="my-3">
				<button type="submit" className="btn btn-primary mx-2">Save Address</button>
				<Link to="/addresslist">
					<button className="btn btn-primary mx-2">Back home</button>
				</Link>
				</div>			
		</div>
	);
}