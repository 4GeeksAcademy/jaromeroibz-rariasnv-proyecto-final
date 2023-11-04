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
			address:[]
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
				let response = await fetch('https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/')
			
				let data = await response.json()

				if (response.ok){
				  setStore({
					addresses: data
				  })
				  console.log('Address exists')
				}
			  
			},
			getAddress: async (theid) => {
				const store = getStore();
				let response = await fetch('https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/' + theid)
				console.log(theid)
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
				fetch('https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/', requestOptions)
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
				fetch(`https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/${theid}`, requestOptions)
					.then((response) => response.json())
					.then((data) =>  setStore({addresses: data}))
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
				
				fetch("https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/" + indexMap, requestOptions)
					.then(response => response.json())
					.then( () => {
						fetch('https://cuddly-spoon-rjj9gv64w9w25x4q-3001.app.github.dev/api/address/')
						.then((response) => response.json())
						.then((data) => setStore({addresses: data}))
					})
					.catch(error => console.log('error', error));
					
				getActions().getAddresses();	
			} 
		}
	};
};

export default getState;
