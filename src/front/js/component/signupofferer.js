import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignupOfferer = () => {
    const {store,actions} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    function sendData(e){
        e.preventDefault()
        console.log('Send Data')
        console.log(name, email, password)
        actions.signUp(name, email, password)
        navigate('/offererprofile')
    }


return (
    <>
    <div className="signinofferer p-3 ">
        <>
        <h1 className="">Create an account</h1>
        <form onSubmit={sendData}>
            <div className="row">
                <div className="col-sm-6">
                    <div className="position-relative mb-4">
                        <label htmlFor="exampleInputName">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter your full name"></input>
                    </div>
                    
                </div>
                <div className="col-sm-6">
                    <div className="position-relative mb-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                </div>
                <div className="col-12 mb-4">
                    <div className="position-relative mb-4">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter password"></input>
                    </div>
                </div>
                <div className="col-12 mb-4">
                    <div className="position-relative mb-4">
                        <button type="submit" className="btn btn-primary btn-lg w-100">Submit</button>
                    </div>
                </div>
                
            </div>
        </form>
        </>
    </div>
    </>
    )
}