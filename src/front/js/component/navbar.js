import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context);

	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">App name</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signin">
						<button className="btn btn-primary">Sign in</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
					{ store.auth === true ? <button onClick={() => actions.logout()} className="btn btn-primary">Logout</button> :null}
					


				</div>
			</div>
		</nav>
	);
};
