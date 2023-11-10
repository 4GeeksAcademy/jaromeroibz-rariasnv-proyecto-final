import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {

return (
    <>
        <div className="signupdiv">
            <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="..." alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">Sign up as petitioner</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/signuppetitioner">
                    <button className="btn btn-primary">Sign up as petitioner</button>
                    </Link>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="..." alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">Sign up as offerer</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/signupofferer">
                        <button className="btn btn-primary">Sign up as offerer</button>
                    </Link>
                </div>
            </div>
        </div>
    </>

    )
}