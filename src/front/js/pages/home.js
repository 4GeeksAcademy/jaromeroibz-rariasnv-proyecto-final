import React, { useContext } from "react";
import { Context } from "../store/appContext";
import fixfridge from "../../img/fixingfridge.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="jumbotron row justify-content-md-start justify-content-center m-3">
			<div className="col-md-6 col-sm-8 order-md-1 order-2 d-flex flex-column justify-content-between mt-4 pt-2 text-md-start text-center">
				<h1 className="display-2 mb-md-5 mb-3 pb-3">Anything you need help with?</h1>
					<div className="mb-md-5 pb-xl-5 mb-4">
						<h3>We make it easy</h3>
						<div className="d-inline-flex align-items-center position-relative mb-3">
							
							<Link to="/signUpAsPetitioner">
								<button className="btn btn-primary">Look for a tasker</button>
							</Link>
						</div>						
					</div>					
			</div>
			<div className="d-inline-flex align-items-center position-relative mb-3 col-sm-6 col-9 order-md-2 order-1">
				<div className="mx-auto">
					<img className="jumboexampleimg" style={{height: "18rem", opacity: ""}} src={fixfridge} />
					<h5>Do you want to work with as?</h5>
					<Link to="/signupofferer">
								<button className="btn btn-primary">Become a tasker</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
