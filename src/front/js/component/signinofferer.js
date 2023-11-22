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
        actions.loginOfferer(email, password)
    }

return (
    <>
    <div className="signinofferer">
        { store.auth === true ? <Navigate to= '/servicelistofferer'/> :
        <>
        you are not logged in
        <h1>Sign in</h1>
        <form onSubmit={sendData}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    }
    </div>
    </>
    )
}