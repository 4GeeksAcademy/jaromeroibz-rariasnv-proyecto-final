import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { AddressList } from "./addressList.js";
// import "../../styles/demo.css";


export const EditAddress = () => {
	const { store, actions } = useContext(Context);
	const {editid} = useParams()
	const [address,setAddress] = useState(
        {
            "name": "",
            "full_address":"",
        }
    );

	function handleChange (event){
		setAddress({
			...address,
			[event.target.name]:event.target.value
		}) 
	}

	function searchAddress () {
		
		const result = store.addresses.find((item) => item.id == editid )
		console.log(result)
		setAddress(   {
            "name": result?.name,
            "full_address":result?.full_address,
        })
	}

	useEffect(() => {searchAddress()}, [])

	return (
		<div className="container">
			<form>
                <div className="form-group py-3">
    				<label>Name</label>
   					<input value={address?.name} onChange={handleChange} name='name' type="text" className="form-control" id="name" placeholder="ex: Home, Work, etc" required/>
  				</div>
				<div className="form-group py-3">
    				<label>Full Address</label>
   					<input value={address?.full_address} onChange={handleChange} name='full_address' type="text" className="form-control" id="full_address" placeholder="Enter Full Address" required/>
  				</div>
				<Link to="/addresslist">
				<button onClick={() => actions.editAddress(address, editid)} type="button" className="btn btn-primary py-3">Update Address</button>
				</Link>
			</form>
			<br />
			<Link to="/addresslist">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
}