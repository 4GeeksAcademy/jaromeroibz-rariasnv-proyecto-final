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
			addresses: []
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
		}
	};
};

export default getState;
