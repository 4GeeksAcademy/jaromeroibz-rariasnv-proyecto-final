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
			services:[],
			service:[],
			auth: false,
			users:[],
			offerers: [],
			offerersDetail: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}, 
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
					const store = getStore()
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(item)
					}
					const response = await fetch(process.env.BACKEND_URL+'api/petitioner', requestOptions)
					const data = await response.json()

					if(response.ok){
						setStore({ petitioners: data })
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
			getAddresses: async () => {
				const store = getStore();
				let response = await fetch(process.env.BACKEND_URL+'/api/address/')
			
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
				const idToDelete = result.id
				// var myHeaders = new Headers();
				// myHeaders.append("Access-Control-Allow-Headers", "*");
				// myHeaders.append("Content-Type", "application/json");

				// var raw = JSON.stringify([]);

				// var requestOptions = {
				// method: 'GET',
				// headers: myHeaders,
				// body: raw,
				// redirect: 'follow'
				// };

				let response = await fetch(process.env.BACKEND_URL+'/api/address/'+ idToDelete)
				let data = await response.json()
				console.log(response)
				if (response.ok){
				  setStore({
					address: data
				  })
				}

			},
			addAddress: (data) => {
				
				const store = getStore();

				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Origin': '*' },
					body: JSON.stringify(data)
				}
				console.log('Add Address')
				fetch(process.env.BACKEND_URL +'/api/address/', requestOptions)
				.then( (response) => response.json() )
				.then( (data) => { getActions().getAddresses()} )
			},
			editAddress: (address, theid) =>{
				const store = getStore();
				const actions = getActions();
				console.log(address)
				console.log(theid)
			    const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( address )
				};
				fetch(process.env.BACKEND_URL +'/api/address/'+theid, requestOptions)
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
				
				console.log(item)
				const store = getStore();
				const actions = getActions();
				const indexMap = getStore().idToDelete
				console.log(indexMap)

				var requestOptions = {
					method: 'DELETE'
				};
				
				fetch(process.env.BACKEND_URL +"/api/address/" + indexMap, requestOptions)
					.then(response => response.json())
					.then( () => {
						fetch(process.env.BACKEND_URL+ '/api/address/')
						.then((response) => response.json())
						.then((data) => setStore({addresses: data}))
					})
					.catch(error => console.log('error', error));
					
				getActions().getAddresses();	
			},
			getServices: async () => {
				const store = getStore();
				let response = await fetch(process.env.BACKEND_URL+'/api/services/')
			
				let data = await response.json()

				if (response.ok){
				  setStore({
					services: data
				  })
				}
			},
			getService: async (result) => {
				const store = getStore();
				const idService = result.id
				let response = await fetch(process.env.BACKEND_URL+'/api/service/'+ idService)
				let data = await response.json()
				if (response.ok){
				  setStore({
					service: data
				  })
				}

			},
			addService: (data) => {
				
				const store = getStore();

				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				}
				console.log('Add Service')
				fetch(process.env.BACKEND_URL +'/api/service/', requestOptions)
				.then( (response) => response.json() )
				.then( (data) => { getActions().getServices()} )
			},
			editService: (service, theid) =>{
				const store = getStore();
				const actions = getActions();
				
			    const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( service )
				};
				fetch(process.env.BACKEND_URL +`/api/service/${theid}`, requestOptions)
					.then((response) => response.json())
					.then((data) =>  actions.getServices())
					.catch((error) => {console.log(error)})
			},
			deleteService: (item) => {
				
				console.log(item)
				const store = getStore();
				const actions = getActions();
				const indexMap = getStore().idToDelete
				console.log(indexMap)

				var requestOptions = {
					method: 'DELETE'
				};
				
				fetch(process.env.BACKEND_URL +"/api/service/" + indexMap, requestOptions)
					.then(response => response.json())
					.then( (data) => {
						getActions().getServices()
					})
					.catch(error => console.log('error', error));
		
			},
			loginOfferer: (email, password) => {
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
				fetch(process.env.BACKEND_URL +"/api/signin/", requestOptions)
					.then(response => {
						console.log(response.status)
						if(response.status === 200){
							setStore({auth: true});
						}
						
						return response.json()
					})
					.then(data =>{
						localStorage.setItem("token", data.access_token)
						setStore({ users: data })
						console.log(data)
						}
					)
			},
			signUpOfferer: (name, email, password) => {
				console.log('Signup desde flux')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(
					{
						"name": name,
						"email": email,
						"password": password
					})
				};
				fetch(process.env.BACKEND_URL +"/api/signup/", requestOptions)
					.then(response => response.json())
					.then(data =>{
						console.log(data)
						setStore({ users: data })
						}
					)

			},
			logout: () => {
				console.log('Log out desde flux')
				setStore({auth: false});
				localStorage.removeItem("token");
			},
			getAllOfferers: async () => {
				try {
					const store = getStore()
					const response = await fetch(process.env.BACKEND_URL+'/api/offerer')
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
					const response = await fetch(process.env.BACKEND_URL+'/api/offerer/'+idToDisplay)
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
					const response = await fetch(process.env.BACKEND_URL+'/api/offerer/'+indexToDelete, requestOptions)

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

					const response = await fetch(process.env.BACKEND_URL+'/api/offerer', requestOptions)
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
					const response = await fetch(process.env.BACKEND_URL+'/api/offerer/'+offererIdToEdit, requestOptions)

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
			}
		}
	};
};

export default getState;
