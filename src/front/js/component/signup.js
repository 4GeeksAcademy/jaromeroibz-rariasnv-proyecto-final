import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {

return (
    <div className="signcontainer">
        <div className="signupdiv p-5">
            <h1 className="my-5">Create an account</h1>
            <p className="my-5">Already have an account? <Link to="/signin"> Sign here</Link> </p>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">                                       
                    <Link to="/signUpAsPetitioner">
                    <button className="btn btn-primary btn-lg w-100">Become a petitoner</button>
                    </Link>
                </div>
            </div>
            <div className="card my-2" style={{width: "18rem"}}>
                <div className="card-body">                                       
                    <Link to="/signupofferer">
                        <button className="btn btn-primary btn-lg w-100">Become a tasker</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    )
}