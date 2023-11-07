import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


// import "../../styles/demo.css";

export const AddressForm = (item) => {
	const { store, actions } = useContext(Context);
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
	}

	function saveAddress () {
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
	}
	
	return (
		<div className="container">
			<form>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={address.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Home, Work, etc"></input>
  				</div>
				<div className="form-group py-3">
    				<label>Full Address</label>
   					<input value={address.full_address} onChange={handleChange} name='full_address' type="text" className="form-control" id="full_address" placeholder="Enter Full Address"></input>
  				</div>
                <div className="form-group py-3">
                    <label>Select your state</label>
                    <select value={address.state} onChange={handleChange} className="form-select" aria-label="Default select example">
                        <option>Select your state</option>
                        <option value= "2">State One</option>
                        <option value= "3">State Two</option>
                        <option value= "4">State Three</option>
                    </select>
                </div>
				<div className="form-group py-3">
    				<label>City</label>
   					<input value={address.city} onChange={handleChange} name='city' type="text" className="form-control" id="city" placeholder="Enter your city"></input>
  				</div>
                <div className="form-group py-3">
    				<label>County</label>
   					<input value={address.county} onChange={handleChange} name='county' type="text" className="form-control" id="county" placeholder="Enter your county"></input>
  				</div>
                <div className="form-group py-3">
    				<label>More details</label>
   					<input value={address.details} onChange={handleChange} name='details' type="text" className="form-control" id="details" placeholder="Apt #, Suite #, etc"></input>
  				</div>
                <div className="form-group py-3">
    				<label>Zipcode</label>
   					<input value={address.zipcode} onChange={handleChange} name='zipcode' type="number" className="form-control" id="zipcode" placeholder="Enter your zipcode"></input>
  				</div>
                <div className="form-group py-3">
    				<label>Latitude</label>
   					<input value={address.latitude} onChange={handleChange} name='latitude' type="text" className="form-control" id="latitude" placeholder="Enter the latitude"></input>
  				</div>
                <div className="form-group py-3">
    				<label>Longitude</label>
   					<input value={address.longitude} onChange={handleChange} name='longitude' type="text" className="form-control" id="longitude" placeholder="Enter the longitude"></input>
  				</div>
				<Link to="/addresslist">
				<button onClick={() => saveAddress()} type="button" className="btn btn-primary py-3">Save Address</button>
				</Link>
			</form>
			<br />
			<Link to="/addresslist">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
}