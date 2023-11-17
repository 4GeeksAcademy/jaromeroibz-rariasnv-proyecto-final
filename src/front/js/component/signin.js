import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signin = () => {

return (
    <div className="signcontainer">
        <div className="signindiv">
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Petitioner</h5>
                    <Link to="/signInAsPetitioner">
                    <button className="btn btn-primary">Sign in</button>
                    </Link>
                </div>
            </div>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Offerer</h5>
                    <Link to="/signinofferer">
                    <button className="btn btn-primary">Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    )
}