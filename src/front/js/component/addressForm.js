import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


// import "../../styles/demo.css";

export const AddressForm = (item) => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [address,setAddress] = useState({
		"name": "",
    	"full_address":""
	});

	var getLocation = function (location) {

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': location }, function (results, status) {
	
		  if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
			var full_address = results[0].formatted_address;
			var county = results[0].address_components[3].long_name;
			var city = results[0].address_components[4].long_name;
			var state = results[0].address_components[5].long_name;
			var country = results[0].address_components[6].long_name;
			var zipcode = results[0].address_components[7].long_name;

			console.log(results)
			console.log(county)
			console.log(city)
			console.log(state)
			console.log(country)
			console.log(zipcode)
			console.log(full_address)
			console.log(latitude, longitude);

			var address_details = {
				"name": address.name,
				"county": county,
				"city": city,
				"state": state,
				"country": country,
				"zipcode": zipcode,
				"full_address": full_address,
				"latitude": latitude,
				"longitude": longitude
			}
			
			console.log(address_details)
			actions.addAddressDetails(address_details)
		  }
		});
	  }

	function handleChange (event){
		setAddress({
			...address,
			[event.target.name]:event.target.value
		}) 
	}

	function saveAddress (e) {
		e.preventDefault()
		actions.addAddress(address)
		getLocation(address.full_address);
		setAddress(
			{
                "name": "",
                "full_address":""
			}
		)
		navigate('/addresslist')
	}
	
	return (
		<div className="container">
			<form onSubmit={(e) => saveAddress(e)}>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={address.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Home, Work, etc" required/>
  				</div>
				<div className="form-group py-3">
    				<label>Full Address</label>
   					<input value={address.full_address} onChange={handleChange} name='full_address' type="text" className="form-control" id="full_address" placeholder="Enter Full Address" required/>
  				</div>
                {/* <div className="form-group py-3">
                    <label>Select your state</label>
                    <select value={address.state} onChange={handleChange} name='state' className="form-select" aria-label="Default select example" required>
                        <option>Select your state</option>
                        <option value= "2">State One</option>
                        <option value= "3">State Two</option>
                        <option value= "4">State Three</option>
                    </select>
                </div> 
				<div className="form-group py-3">
    				<label>City</label>
   					<input value={address.city} onChange={handleChange} name='city' type="text" className="form-control" id="city" placeholder="Enter your city" required/>
  				</div>
                <div className="form-group py-3">
    				<label>County</label>
   					<input value={address.county} onChange={handleChange} name='county' type="text" className="form-control" id="county" placeholder="Enter your county" required/>
  				</div>
                <div className="form-group py-3">
    				<label>More details</label>
   					<input value={address.details} onChange={handleChange} name='details' type="text" className="form-control" id="details" placeholder="Apt #, Suite #, etc"></input>
  				</div>
                <div className="form-group py-3">
    				<label>Zipcode</label>
   					<input value={address.zipcode} onChange={handleChange} name='zipcode' type="number" className="form-control" id="zipcode" placeholder="Enter your zipcode" required/>
  				</div>
                <div className="form-group py-3">
    				<label>Latitude</label>
   					<input value={address.latitude} onChange={handleChange} name='latitude' type="text" className="form-control" id="latitude" placeholder="Enter the latitude"></input>
  				</div>
                <div className="form-group py-3">
    				<label>Longitude</label>
   					<input value={address.longitude} onChange={handleChange} name='longitude' type="text" className="form-control" id="longitude" placeholder="Enter the longitude"></input>
  				</div>
				*/}
				<button type="submit" className="btn btn-primary py-3">Save Address</button>
			</form>
			<br />
			<Link to="/addresslist">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
}