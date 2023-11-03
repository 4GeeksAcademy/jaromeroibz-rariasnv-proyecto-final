import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegisteredPetitionerDetail = () => {
    return (
        <div className="body m-5">
            <div className="card" style={{width: "18rem"}}>
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Petitioner ID: </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Full Name</h6>
                    <p className="card-text">Phone number: </p>
                    <p className="card-text">Address: </p>
                    <p className="card-text">Email address: </p>
                    <p className="card-text">Offer: </p>
                    <p className="card-text">Rating: </p>

                    <Link to="/">
                    <button className="btn btn-primary">Home</button>
                    </Link>
                    <button className="btn btn-danger mx-2">Delete</button>
                </div>
            </div>
        </div>
    )
}