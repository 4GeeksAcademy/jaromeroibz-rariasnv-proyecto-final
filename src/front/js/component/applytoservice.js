import React, { useState, useEffect, useContext, useSyncExternalStore } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom"
import { Context } from "../store/appContext";
// import "../../styles.demo.css";

export const ApplytoService = () => {
    const { store, actions } = useContext(Context);

    const [service,setService] = useState({

			"name": "",
			"category": "",
			"description": "",
			"date": "",
			"status": false
	});

    const changeStatus =(id)=>{
        const newArr = store.services.map((item,index)=>{
            if(item.id===id){
               return {...item,status:!item.status}
            }
            else return;
           })
		   console.log(newArr)
           setService(newArr)
		   console.log(service)
		   actions.changeStatus(service)
      }
      
    useEffect(() => {
        actions.getServices()
    }, [])
    // function acceptService(){
	// 	// navigate(`/serviceconfirmation/${item.id}`)
	// 	// const result = store.services.find((item) => item.id = )
    //     // setService({
    //     //     "name": store.services.name,
    //     //     "category": "",
    //     //     "description": "",
    //     //     "status": false
    //     // })
    // }
    // const result = store.services.find((item) => item.id == theid ) 
    //Aquí agregar un fin que encuentre los servicios con id= user.id

    return (
    
        <div className="container">
			<ul className="list-group py-5">
			<h1 className="py-3">Respond to a service proposal</h1>
			{store.services.map((item) => 

					<li key= {item.id}
						className="list-group-item d-flex"
						>
						<img src="https://picsum.photos/200" alt=""></img>
						<div className="d-block px-5">
                            <h1>{item.name}</h1>
							Category:
                            <p className="info">{item.category}</p>
							Date:
                            <p className="info">{item.date}</p>
							Description:
                            <p className="info">{item.description}</p>
						</div>
						<div className="container">
                            <Link to={`/service/${item.id}`}>
                                See details
                            </Link>
						</div>
                        <div>
                        { item.status === true ? 
                            <p>Service Applied</p>
                            :
							<button onClick={() => changeStatus(item.id)}>Apply to service</button>
                            // <Link to={`/serviceconfirmation/${item.id}`}>
                            //     Accept service
                            // </Link>
                                }
                        </div>
						<div className="trashcan px-5">
							<button onClick= { () => actions.saveToDelete(item.id) } type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
							Deny
							</button>
							<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="exampleModalLabel">Delete service</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Are you sure you want to deny this service proposal?
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button onClick={ () => actions.deleteService(item)} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
									</div>
									</div>
								</div>
							</div>
						</div>	
					</li>
			)}
			</ul>
			<br />
		</div>
    )
}