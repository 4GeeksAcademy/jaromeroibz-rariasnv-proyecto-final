import React, {useState, useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignupAsPetitioner = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function savePetitionerToAdd(e) {
        e.preventDefault()
        const result = await actions.signUpPetitioner(name,email,password)
        console.log(result)
        if (result == 200){
        navigate('/serviceform')
        }
    };

    return(
        <div className="signuppetitioner p-3">
            { store.auth === true ? <Navigate to= '/serviceform'/> :
            <>
            <h1 className="">Create an account</h1>
            <form>
                <div className="row">
                <div className="col-sm-6">
                    <div className="position-relative mb-4">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name"
                        value={name} onChange={(e) => setName(e.target.value)} name='name'
                        placeholder="Enter your full name"/>
                    </div>                    
                </div>
                <div className="col-sm-6">
                    <div className="position-relative mb-4">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email"
                        value={email} onChange={(e) => setEmail(e.target.value)} name='email'
                        placeholder="Enter email address"/>
                    </div>
                    
                </div>
                <div className="col-12 mb-4">
                    <div className="position-relative mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} name='password'
                        placeholder="Enter password"/>
                    </div>                    
                </div>
                <div className="col-12 mb-4">
                    <div className="position-relative mb-4">
                        <button className="btn btn-primary btn-lg w-100" onClick={ (e) => savePetitionerToAdd(e) }>Signup</button>
                    </div>
                </div>
                    
                </div>
            </form>
            </>
        }
        </div>
    )
}