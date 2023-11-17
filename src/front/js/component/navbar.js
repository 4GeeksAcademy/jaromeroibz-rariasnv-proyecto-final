import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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
			<div className="container">
				<Link to="/">
					<span className="btn btn-light navbar-brand pe-3">App name</span>
				</Link>
				<div className="d-flex">					
					<div className="px-3">
						<Link to="/signin">
							<button className="btn btn-lg btn-primary flex-shrink-0 me-md-4 mb-md-0 mb-sm-4 mb-3">Sign in</button>
						</Link>
					</div>
					<div className="">
						<Link to="/signup">
							<button className="btn btn-lg btn-primary flex-shrink-0 me-md-4 mb-md-0 mb-sm-4 mb-3">Signup</button>
						</Link>
						{ store.auth === true ? <button onClick={() => handleLogout()} className="btn btn-primary">Logout</button> :null}
					</div>
				</div>
			</div>
		</nav>
		<hr></hr>
		</>
	);
};
