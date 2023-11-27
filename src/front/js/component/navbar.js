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
					<span className="btn btn-light">App name</span>
				</Link>
				<div className="d-flex">
					{ store.auth === true ? <p className="py-1 px-3">Hello {store.users.name}!</p> : 
					<>					
					<div className="px-3">
						<Link to="/signin">
							<button className="btn btn-light">Sign in</button>
						</Link>
					</div>
					<div className="">
						<Link to="/signup">
							<button className="btn btn-light">Signup</button>
						</Link>
					</div>
					</>
					}
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
