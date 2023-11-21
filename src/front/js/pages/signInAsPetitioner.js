import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignInAsPetitioner = () => {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function sendData(e){
        e.preventDefault()
        const result = await actions.loginPetitioner(email,password)
        console.log(result)
        if (result == 200){
            navigate('/serviceform')
        }
    }
    
    return(
            <div className="signInAsPetitioner m-5">
                 <h1>Sign in</h1>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={ (e) => setEmail(e.target.value) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }></input>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
    )
}