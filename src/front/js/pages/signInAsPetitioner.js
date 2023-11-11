import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignInAsPetitioner = () => {
    const {store, actions} = useContext(Context);

    return(
            <div className="signInAsPetitioner m-5">
                 <h1>Sign in</h1>
                <form>
                    <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
    )
}