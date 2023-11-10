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
			IdToDelete: ""

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
			// preguntar a deimian el por que colocar en arreglos separados la data de petitioners y de uno en detalle
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
			}
		}
	};
};

export default getState;
