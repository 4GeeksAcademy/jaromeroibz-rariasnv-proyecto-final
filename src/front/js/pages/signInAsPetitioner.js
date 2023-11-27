import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignInAsPetitioner = () => {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function sendData(e){
        // e.preventDefault()
        actions.loginPetitioner(email,password)
        // console.log(result)
        // if (result == 200){
        //     navigate('/serviceform')
        // }
        navigate('/serviceform')
    }
    
    return(
            <div className="signInAsPetitioner">
                <p className="">Sign in</p> 
                <h1 className="">Welcome back!</h1>
                <form onSubmit={sendData}>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="position-relative mb-4">
                                <label className="my-2" htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control my-2" id="email" placeholder="Enter email" onChange={ (e) => setEmail(e.target.value) }></input>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <div className="position-relative mb-4">
                                <label className="my-2" htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control my-2" id="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }></input>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <div className="position-relative mb-4">
                                <button type="submit" className="btn btn-primary btn-lg w-100">Submit</button>                            
                            </div>
                        </div>
                        
                        

                    </div>
                    
                </form>
            </div>
    )
}