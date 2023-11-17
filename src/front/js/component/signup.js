import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {

return (
    <div className="signcontainer">
        <div className="signupdiv">
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Petitioner</h5>                    
                    <Link to="/signUpAsPetitioner">
                    <button className="btn btn-primary">Sign up</button>
                    </Link>
                </div>
            </div>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Offerer</h5>                    
                    <Link to="/signupofferer">
                        <button className="btn btn-primary">Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    )
}