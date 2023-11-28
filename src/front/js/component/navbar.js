import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logoapp.png"

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const navigate = useNavigate();

	function handleLogout(){
		actions.logout()
		navigate('/signin')
	}

	return (
		<>
		<nav className="navbar">
			<div className="container px-3">
				<Link to="/">
					<div className="divlogo row pe-3">
						<img className="navbar-brand navbarlogo col-12" src={logo}/>
						Easy me							
					</div>					
				</Link>
				<div className="d-flex">
					{ store.auth === true ? <p className="py-1 px-3">Hello {store.users.name}!</p> : 
					<>					
					<div className="px-3">
						<Link to="/signin">
							<button className="btn btn-lg btn-primary flex-shrink-0 me-md-4 mb-md-0 mb-sm-4 mb-3">Sign in</button>
						</Link>
					</div>
					<div className="">
						<Link to="/signup">
							<button className="btn btn-lg btn-primary flex-shrink-0 me-md-4 mb-md-0 mb-sm-4 mb-3">Signup</button>
						</Link>
					</div>
					</>
					}
					<div className="px-3">
					{ store.auth === true ? <Link to ="/servicelist"><button className="btn btn-primary">Services</button></Link> :null}
					</div>
					<div className="px-3">
					{ store.auth === true ? <Link to ="/addresslist"><button className="btn btn-primary">Addresses</button></Link> :null}
					</div>
					<div className="px-3">
					{ store.auth === true ? <button onClick={() => handleLogout()} className="btn btn-primary">Logout</button> :null}
					</div>
				</div>
			</div>
		</nav>
		<hr></hr>
		</>
	);
};
