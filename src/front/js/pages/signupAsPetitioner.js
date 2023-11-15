import React, {useState, useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignupAsPetitioner = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function savePetitionerToAdd(e) {
        e.preventDefault()
        actions.signUp(name,email,password)
        navigate('/servicelist')
    };

    return(
        <div className="signuppetitioner">
            <h1>Sign up</h1>
            <form>
            <div className="py-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name"
                value={name} onChange={(e) => setName(e.target.value)} name='name'
                placeholder="Enter full name"/>
            </div>
            <div className="py-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email"
                value={email} onChange={(e) => setEmail(e.target.value)} name='email'
                placeholder="Enter email address"/>
            </div>
            <div className="py-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                value={password} onChange={(e) => setPassword(e.target.value)} name='password'
                placeholder="Enter password"/>
            </div>
            <button className="btn btn-primary" onClick={ (e) => savePetitionerToAdd(e) }>Signup</button>
            </form>
        </div>
    )
}