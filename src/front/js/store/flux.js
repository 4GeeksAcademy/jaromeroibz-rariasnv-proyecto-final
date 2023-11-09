import { useParams } from "react-router-dom";

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
			addresses: [],
			idToDelete: "",
			address:[],
			services:[],
			service:[],
			auth: false

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
				let response = await fetch(process.env.BACKEND_URL+'/api/address/'+ idToDelete)
				let data = await response.json()
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
					headers: { 'Content-Type': 'application/json' },
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
				
			    const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( address )
				};
				fetch(process.env.BACKEND_URL +`/api/address/${theid}`, requestOptions)
					.then((response) => response.json())
					.then((data) =>  actions.getAddresses())
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
					.then( () => {
						fetch(process.env.BACKEND_URL+ '/api/service/')
						.then((response) => response.json())
						.then((data) => setStore({services: data}))
					})
					.catch(error => console.log('error', error));
					
				getActions().getServices();	
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
						console.log(data)
						}
					)
			},
			signUpOfferer: (name, email, password) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8M67rYfw57hCj5sJjtQyecE0yTE-lQI7zxGMWcXzykmDxDRsbxz74rXPtMIKU43XSFPKDMtorCZbzLlWjYmaNOkwrv3VNMpe77i8aQgdP00lctcz08WJ-9d1HPBPsBk8annUIuDp3HiqfSxvIO8cd7eaUuz8DqWboIBeEKk2T8RzmzYkdrrTH0MqaSCI4eZdS0WiA_PEe_NoZlVYCvNtK_xZfIPKEBGQA1Wixex2dmPDAwQK5FpATQIPkWKSLACoDGEk2rfajNV9TtgiVJ2GWbLF2QkpUTpceXGCLW7qYn6YKiBLoxFEgqCkm5Wl4a486Do83VbdG7kARup4P06Tv_-n-m_D-hd1Kq3XJZNm77KFtiv9wynqKZ4T0guRfNKgh-tgvF0I94BWnF2EKsvDCRZySUOvp-n9PzEiSQm1cp0Hmjsj6gx0nrM_F1h0_IRglUUXpk8A7ERgbagt1mWWQYIIyGpoF4OLhRGsG8pj2-HbcUHUMK_6gaOzJOO2_gdvxHnSRUvSAbJAWNGrFCvEL8D5sfbslW-xb7i77SQ_KL7l3bTzMSRGvKRqENuy0M8j4Ye-BsGvXGplYbfJl2Q76FEVZv1Cwroe1t5WniwkSp49-MBLj_lLnCm3uxNAMd439054o4pAy3DSdbxy07iLdvfaJVPOnZBFhkcmPbpjn9d3V_ES1ijOcIfMU4uRv28yq4MbNUs9YsGHRKKQrUKPp1MGXnkLYcMZk5P1r7FmKVnhQ0QD41JfpG3uMx9aYofNG6ju11YLuh0BleKt7VeiLoyGlkqCdlzuiPxqYMk0zwtUFbW-w4Otq8uUoZpIjBoIBsU-fiB_Vo0L4zEvCCzz0kpJjbFOVzhcz9I28AQdMGIsOP3iKfX8x6TZEQHE04u9HYTnvIw43OP4eQ8YJZha6WlttP2N-Luzpvzk14n5SkZWpZ2ipUlKv2iM7FCn0IPb7w");

				var raw = JSON.stringify({
				"name": name,
				"email": email,
				"password": password
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL+"/api/signup", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));
			},
			logout: () => {
				console.log('Log out desde flux')
				setStore({auth: false});
				localStorage.removeItem("token");


			}
		}
	};
};

export default getState;
