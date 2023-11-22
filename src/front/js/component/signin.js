import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signin = () => {

return (
    <div className="signcontainer">       
        <div className="signindiv p-5">
            <h1 className="my-5">Welcome back!</h1>
            <p className="my-5">Don't have an account yet? <Link to="/signup"> Register here</Link> </p>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">                    
                    <Link to="/signInAsPetitioner">
                        <button className="btn btn-primary btn-lg w-100">Access as petitioner</button>
                    </Link>
                </div>
            </div>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">                    
                    <Link to="/signinofferer">
                    <button className="btn btn-primary btn-lg w-100">Access as tasker</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    )
}