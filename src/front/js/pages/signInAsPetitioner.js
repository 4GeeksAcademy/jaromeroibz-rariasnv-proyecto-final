import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignInAsPetitioner = () => {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function sendData(e){
        e.preventDefault()
        actions.signInAsAPetitioner(email,password)
        navigate('/')
    }


    return(
            <div className="signInAsPetitioner">
                <p className="m-2">You are not logged in</p> 
                <h1 className="m-2">Sign in</h1>
                <form onSubmit={sendData}>
                    <div className="form-group m-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={ (e) => setEmail(e.target.value) }></input>
                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }></input>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Submit</button>
                </form>
            </div>
    )
}