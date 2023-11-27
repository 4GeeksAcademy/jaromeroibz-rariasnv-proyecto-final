import { Navigate, useParams } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			petitioners: [],	
			petitionersDetail: [],		
			IdToDelete: "",
			addresses: [],
			idToDelete: "",
			address:[],
			allServices:[],
			services:[],
			servicesApplied: [],
			service:[],
			serviceDetails:{},
			auth: JSON.parse(localStorage.getItem("auth"))||false,
			token: localStorage.getItem("token")||"",
			users:[],
			offerers: [],
			offerersDetail: [],
			categories: [],
			PetitionerStatus: [],
			petitionerBearerToken: "",
			offererBearerToken: "",
			offererServices: [],
			petitionerServices: [],
			confirmedServices: []
		},
		actions: {
			getAllPetitioners: async () => {								
				 try {
					const store = getStore();
					const response = await fetch(process.env.BACKEND_URL+'api/petitioner')	
					const data = await response.json()
					
					if(response.ok){
						setStore({ petitioners: data})
					}
				 } catch (error) {
					console.log(error)
				 }
			},
			getPetitioner: async (result) => {
				try {
					const store = getStore()	
					const idToDisplay = result.id				
					const response = await fetch(process.env.BACKEND_URL+'api/petitioner/'+idToDisplay)
					const data = await response.json()

					if(response.ok){
						setStore({ petitionersDetail: data})
					}
				} catch (error) {
					console.log(error)
					
				}
			},
			deleteParticularPetitioner: async (petitioner) => {
				try {
					const store = getStore()					
					const indexToDelete = petitioner.id
					const requestOptions = {
						method: 'DELETE'
					}
					const response = await fetch(process.env.BACKEND_URL+'api/petitioner/'+indexToDelete, requestOptions) 	
					
					if(response.ok){
						try {
							const response = await fetch(process.env.BACKEND_URL+'api/petitioner')
							const data = await response.json()

							if(response.ok){
								setStore({ petitioners: data })
								const res = await response.json()
							}
						} catch (error) {
							console.log(error)
						}
					}
				} catch (error) {
					console.log(error)
				}
			},
			addPetitioner: async (item) => {
				try {
					console.log(item)
					const store = getStore()
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(item)
					}
					const response = await fetch(process.env.BACKEND_URL+'api/signup', requestOptions)
					const data = await response.json()

					if(response.ok){
						setStore({ users: data })
					}
				} catch (error) {
					
				}
			},
			editPetitioner: async (item, idToEdit) => {
				try {
					const store = getStore()
					const requestOptions = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(item)
					}
					const response = await fetch(process.env.BACKEND_URL+'api/petitioner/'+idToEdit, requestOptions)
					if(response.ok){
						try {
							const response = await fetch(process.env.BACKEND_URL+'/api/petitioner')
							const data = await response.json()

							if(response.ok){
								setStore({ petitioners: data })
								const res = await response.json()
							}
						} catch (error) {
							console.log(error)
						}
					}
				} catch (error) {
					console.log(error)
				}
			},
			getAddresses: async () => {
				const store = getStore();
				let token = localStorage.getItem("token")
				
				const requestOptions = {
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(data)
				}

				let response = await fetch(process.env.BACKEND_URL+'api/address', requestOptions)
			
				let data = await response.json()

				if (response.ok){
				  setStore({
					addresses: data
				  })
				  console.log('Address exists')
				}
			},
			getAddress: async (result) => {
				const store = getStore();
				let token = localStorage.getItem("token")
				
				const requestOptions = {
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(result)
				}

				const idToGet = result.id
				let response = await fetch(process.env.BACKEND_URL+'api/address/'+ idToGet, requestOptions)
				let data = await response.json()
				console.log(response)	
				if (response.ok){
				  setStore({
					address: data
				  })
				}

			},
			addAddress: async (result) => {
				
				console.log(result)
				const store = getStore();
				let token = localStorage.getItem("token")

				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(data)
				}
			
				let response = await fetch(process.env.BACKEND_URL +'api/add_address/', requestOptions)
				let data = await response.json();
				if (response.ok === 200){
					getActions().getAddresses()
				}
				console.log(data)
			},
			editAddress: (address, theid) =>{
				
				let token = localStorage.getItem("token")
				
			    const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify( {address} )
				};
				fetch(process.env.BACKEND_URL +'api/address/'+theid, requestOptions)
					.then((response) => response.json())
					.then((data) =>  { getActions().getAddresses()
									   console.log(data)
									})
					.catch((error) => {console.log(error)})
			},
			saveToDelete: (theid) =>{
				setStore({
					idToDelete: theid
				})
			},
			deleteAddress: (item) => {

				const indexMap = getStore().idToDelete
				console.log(indexMap)
				
				const requestOptions = {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`}
				}

				fetch(process.env.BACKEND_URL +"api/address/" + indexMap, requestOptions)
					.then(response => response.json())
					.then( () => {
						fetch(process.env.BACKEND_URL+ '/api/address/')
						.then((response) => response.json())
						.then((data) => setStore({addresses: data}))
					})
					.catch(error => console.log('error', error));
					
				getActions().getAddresses();	
			},
			getAllServices: async () => {
				const store = getStore();
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`}
				}
				let response = await fetch(process.env.BACKEND_URL+'api/all_services', requestOptions)
				let data = await response.json()
				console.log(data)
				if (response.ok){
				  setStore({allServices: data})
				}
			},
			getPetitionerServices: async () => {

				let token = localStorage.getItem("token")
				const requestOptions = {
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(data)
				}
				let response = await fetch(process.env.BACKEND_URL+'api/get_petitioner_services',requestOptions)
				let data = await response.json()
				console.log(data)
				if (response.ok){
				  setStore({petitionerServices: data})
				}
				//pasar un header "authorization" clase auth. Agregar backend jwt required. get jwt identity. filter by id (está dentro del token) 
			},
			getOffererServices: async () => {

				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
				}
				let response = await fetch(process.env.BACKEND_URL+'api/offerer_services/',requestOptions)
				let data = await response.json()
					console.log(data)
					if (response.ok){
					setStore({offererServices: data})
					}
				//pasar un header "authorization" clase auth. Agregar backend jwt required. get jwt identity. filter by id (está dentro del token) 
			},
			addService: async (service) => {
				console.log(service)
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(service)
				}
				console.log('Add Service')
				let response = await fetch(process.env.BACKEND_URL +'api/add_services/', requestOptions)
				let data = await response.json();
				if (response.ok === 200){
					getActions().getPetitionerServices()
				}
				console.log(data)
			},
			getServiceDetails: async (serviceId) => {
				
				let token = localStorage.getItem("token")
				const requestOptions = {
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(data)
				}
				let response = await fetch(process.env.BACKEND_URL+'api/petitioner_services/' + serviceId, requestOptions)
				let data = await response.json()
				console.log(data)
				if (response.ok){
				  setStore({serviceDetails: data})
				  console.log(data)
				  console.log(getStore().serviceDetails)
				}
			},
			addOffererService: async (idService, price) => {
				const store = getStore();
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': "*",
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify({"price":price,
										  "service_id":idService})
				}
				console.log('Add Service')
				let response = await fetch(process.env.BACKEND_URL +'api/add_offerer_service', requestOptions)
				let data = await response.json()
				if (response.ok === 200){
					console.log(data)
					setStore({offererServices: data})
				}
				getActions().getOffererServices()
			},
			editService: (service, theid) =>{
				const actions = getActions();
				
				let token = localStorage.getItem("token")
				
			    const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify( {service} )
				};
				fetch(process.env.BACKEND_URL +`api/service/${theid}`, requestOptions)
					.then((response) => response.json())
					.then((data) =>  actions.getServices())
					.catch((error) => {console.log(error)})
			},
			deletePetitionerService: async (indexMap) => {
				console.log(indexMap)
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify(data)
				}

				let response = await fetch(process.env.BACKEND_URL+'api/delete_petitioner_service/' + indexMap, requestOptions)
					let data = await response.json()
					if (response.ok){
						getActions().getPetitionerServices()
					  }

					  
			},
			deleteOffererService: async (indexMap) => {
				
				let token = localStorage.getItem("token")
					const requestOptions = {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json',
									'Authorization': `Bearer ${token}`},
						body: JSON.stringify(data)
					}
	
					let response = await fetch(process.env.BACKEND_URL+'api/petitioner_services/' + indexMap, requestOptions)
						let data = await response.json()
						if (response.ok){
							actions.getPetitionerServices()
						  }
			},
			loginOfferer: async (email, password) => {
				console.log('Login desde flux')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(
					{
						"email": email,
						"password": password
					})
				};
				let response = await fetch(process.env.BACKEND_URL +"api/signin_offerer", requestOptions)
				let data = await response.json()	
					if(response.status === 200){
						setStore({auth: true});
						setStore({ users: data })
						console.log(data)
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("auth", true)
					}
						
				return response.status
			},
			loginPetitioner: async (email, password) => {
				console.log('Login desde flux')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(
					{
						"email": email,
						"password": password
					})
				};
				let response = await fetch(process.env.BACKEND_URL +"api/signin_petitioner", requestOptions)
				let data = await response.json()
				if (response.status == 200){
					setStore({auth: true});
					console.log(data)
					setStore({ users: data })
					localStorage.setItem("token", data.access_token)
					localStorage.setItem("auth", true)

				}
				return response.status

			},
			signUpOfferer: (name,email,password) => {
				console.log('Signup desde flux')
				console.log(name,email,password)
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Origin': '*' },
					body: JSON.stringify({

						"name": name,
						"email": email,
						"password": password
					})
				}
				const isLogin = fetch(process.env.BACKEND_URL +'api/signup_offerer', requestOptions)
					.then((response) => {
						if(response.status === 200){
							setStore({auth: true});
						}
						return response.json()
					})
					.then((data) =>{
						console.log(data)
						setStore({ users: data })
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("auth", true)
						return true
						}
					)
					return isLogin
			},
			signUpPetitioner: async (name,email,password) => {

				console.log('Signup desde flux')
				console.log(name,email,password)
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Origin': '*' },
					body: JSON.stringify({

						"name": name,
						"email": email,
						"password": password
					})
				}
				let response = await fetch(process.env.BACKEND_URL +'api/signup_petitioner', requestOptions)
					let data = await response.json()
					if (response.status == 200){
						setStore({auth: true});
						console.log(data)
						setStore({ users: data })
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("auth", true)
					}
					return response.status
			},
			logout: () => {
				console.log('Log out desde flux')
				setStore({auth: false});
				localStorage.removeItem("token");
				localStorage.removeItem("auth");

			},
			getAllOfferers: async () => {
				try {
					const store = getStore()
					const response = await fetch(process.env.BACKEND_URL+'api/offerer')
					const data = await response.json()

					if(response.ok){
						setStore({ offerers: data})
					}
				} catch (error) {
					console.log(error)
				}
			},
			getOfferer: async (result) => {
				try {
					const store = getStore()
					const idToDisplay = result.id
					const response = await fetch(process.env.BACKEND_URL+'api/offerer/'+idToDisplay)
					const data = await response.json()

					if(response.ok){
						setStore({ offerersDetail: data })
					}
				} catch (error) {
					console.log(error)
				}
			},
			deleteParticularOfferer: async (offerer) => {
				try {
					const store = getStore()
					const indexToDelete = offerer.id
					const requestOptions = {
						method: 'DELETE'
					}
					const response = await fetch(process.env.BACKEND_URL+'api/offerer/'+indexToDelete, requestOptions)

					if(response.ok){
						try {
							const response = await fetch(process.env.BACKEND_URL+'/api/offerer')
							const data = await response.json()

							if(response.ok){
								setStore( {offerers: data} )
							}
						} catch (error) {
							console.log(error)
						}
					}
				} catch (error) {
					console.log(error)
				}
			},
			addOfferer: async (item) => {
				try {
					const store = getStore()
					const requestOptions = {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(item)
					}

					const response = await fetch(process.env.BACKEND_URL+'api/offerer', requestOptions)
					const data = await response.json()

					if(response.ok){
						setStore({ offerers: data })
					}
				} catch (error) {
					
				}
			},
			editOfferer: async (item, offererIdToEdit) => {
				try {
					const store = getStore()
					const requestOptions = {
						method: 'PUT',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(item)
					}
					const response = await fetch(process.env.BACKEND_URL+'api/offerer/'+offererIdToEdit, requestOptions)

					if(response.ok){
						try {
							const response = await fetch(process.env.BACKEND_URL+'/api/offerer')
							const data = await response.json()

							if(response.ok){
								setStore({ offerers: data })
							}
						} catch (error) {
							console.log(error)
						}
					}
				} catch (error) {
					console.log(error)
				}
			},
			// signInAsAPetitioner: async (email, password) => {
			// 	console.log('Login desde flux')
			// 	const requestOptions = {
			// 		method: 'POST',
			// 		headers: { 'Content-type': 'application/json' },
			// 		body: JSON.stringify(
			// 		{
			// 			"email": email,
			// 			"password": password
			// 		})
			// 	};
			// 	console.log(email,password)
			// 	fetch(process.env.BACKEND_URL +"api/signin", requestOptions)
			// 		.then(response => {
			// 			console.log(response.status)
			// 			if(response.status === 200){
			// 				setStore({auth: true});
			// 			}
						
			// 			return response.json()
			// 		})
			// 		.then(data =>{
			// 			localStorage.setItem("token", data.access_token)
			// 			setStore({ users: data })
			// 			console.log(data)
			// 			}
			// 		)
			// 		.catch((error) => console.log(error))
			// },
			getServiceCategory: async () => {
				const store = getStore();
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`}
				}	
				let response = await fetch(process.env.BACKEND_URL+'api/servicescategory', requestOptions)
				let data = await response.json()
				if (response.ok){
				  setStore({categories: data})
				  }
			},
			addServiceCategory: async () => {
			// 	console.log('add cat desde flux')
			// 	const requestOptions = {
			// 		method: 'POST',
			// 		headers: { 'Content-type': 'application/json' },
			// 		body: JSON.stringify(
			// 		{
			// 			"category": store.categories,
			// 			"email": email,
			// 			"password": password
			// 		})
			// 	};
			// 	fetch(process.env.BACKEND_URL +"/api/signup/", requestOptions)
			// 		.then(response => response.json())
			// 		.then(data =>{
			// 			console.log(data)
			// 			setStore({ users: data })
			// 			}
			// 		)
			},
			updateStatusPetitioner: async (serviceId) => {

				let token = localStorage.getItem("token")

				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify({data})
				}
				let response = await fetch(process.env.BACKEND_URL +'api/service_status_update/' + serviceId , requestOptions)
				let data = await response.json()
				if (response.ok){
					console.log(data)
				}
			},
			updateServiceStatusOfferer: async (serviceId) => {

				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify({serviceId})
				}

				let response = await fetch(process.env.BACKEND_URL+'api/service_status_update_offerer/'+ serviceId , requestOptions)
					let data = await response.json()
					if(response.ok){
						console.log(data)
					}
			},
			updateServiceStatusOffererPetitionerView: async (serviceId, offererId) => {

				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify({serviceId})
				}

				let response = await fetch(process.env.BACKEND_URL+'api/service_status_update_offerer_petitioner_view/'+ serviceId + '/'+ offererId, requestOptions)
					let data = await response.json()
					if(response.ok){
						console.log(data)
					}

				
			},
			updateServiceStatusEvaluatingProposal: async (serviceId) => {
				
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`},
					body: JSON.stringify({serviceId})
				}

				let response = await fetch(process.env.BACKEND_URL+'api/service_status_update_evaluating_proposal/'+ serviceId , requestOptions)
					let data = await response.json()
					if(response.ok){
						console.log(data)
					}
				
			},
			deleteServiceApplied: async () => {

			},
			getServicesApplied: async () => {
				getStore().getServicesApplied()
			},
			getCategories: async () => {
				const store = getStore();
	
				let response = await fetch(process.env.BACKEND_URL+'api/categories')
				let data = await response.json()
				if (response.ok){
				  setStore({
					categories: data
				  })
				}

			}

		}
	};
};

export default getState;
