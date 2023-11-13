import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const navigate = useNavigate();

	function handleLogout(){
		actions.logout()
		navigate('/signinofferer')
	}

	return (
		<>
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<span className="btn btn-light">App name</span>
				</Link>
				<div className="d-flex">					
					<div className="px-3">
						<Link to="/signin">
							<button className="btn btn-light">Sign in</button>
						</Link>
					</div>
					<div className="">
						<Link to="/signup">
							<button className="btn btn-light">Signup</button>
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
