import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SigninOfferer = () => {
    const {store,actions} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        console.log('Send Data')
        console.log(email, password)
        actions.login(email, password)
    }

return (
    <>
    <div className="signinofferer">
        { store.auth === true ? <Navigate to= '/offererprofile'/> :
        <>
        <p className="m-2">You are not logged in</p>        
        <h1 className="m-2">Sign in</h1>
        <form onSubmit={sendData}>
            <div className="form-group m-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div className="form-group m-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary m-2">Submit</button>
        </form>
        </>
    }
    </div>
    </>
    )
}