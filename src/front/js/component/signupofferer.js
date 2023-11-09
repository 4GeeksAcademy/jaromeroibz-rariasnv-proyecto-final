import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignupOfferer = () => {
    const {store,actions} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        console.log('Send Data')
        console.log(name, email, password)
        actions.signupOfferer(name, email, password)
    }

return (
    <>
    <div className="signinofferer">
        <>
        <h1>Sign up</h1>
        <form onSubmit={sendData}>
            <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter your name"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    </div>
    </>
    )
}