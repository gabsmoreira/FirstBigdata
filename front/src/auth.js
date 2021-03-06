export default window.auth = {
	login:(name1, password1, callback)=>{
			const baseUrl ='http://localhost:5000';
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			fetch(baseUrl + '/login', {
					method: 'POST',
					headers,
					body : JSON.stringify({
							username: name1,
							password:password1})
			}).then((response) => {
					console.log(response)
					var data = response.json().then((data) => {
							// console.log(data)
					callback(data)
					})
			})
	},
	
	register:(name1, password1,callback) => {
			const baseUrl ='http://localhost:5000';
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');

			fetch(baseUrl + '/users', {
					method: 'POST',
					headers,
					body : JSON.stringify({
							username: name1,
							password:password1})
			}).then((response) => {
					console.log(response);
					var data = response.json().then((data) => {
							// console.log(data)
					callback(data)
					})
			})
	},

	deleteUser:(name1, callback) => {
		const baseUrl ='http://localhost:5000/users?';
		let params = new URLSearchParams(Object.entries({
			username: name1,
		}))

		fetch(baseUrl + params, {
				method: 'DELETE',
		}).then((response) => {
			console.log(response);
				
						// console.log(data)
			callback(response)
		})
},

	

	getList:(callback) => {			
		const baseUrl ='http://localhost:5000';
		fetch(baseUrl + '/tvshows', {
				method: 'GET',
		}).then((response) => {
				var data = response.json().then((data) => {
				callback(data)
				})
		})
	},

	search:(search1, genre1, callback) => {
		if(search1 == null){
			search1 = ""
		}
		if(genre1 == "All"){
			genre1 = ""
		}

		const baseUrl ='http://localhost:5000';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		fetch(baseUrl + '/search', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					search: search1,
					genre: genre1
				})
		}).then((response) => {
				var data = response.json().then((data) => {
				callback(data)
				})
		})
	},

	// myList:(user1, callback) => {
	// 	const baseUrl ='http://localhost:5000';
	// 	const headers = new Headers();
	// 	headers.append('Content-Type', 'application/json');
	// 	fetch(baseUrl + '/seen', {
	// 			method: 'POST',
	// 			headers,
	// 			body: JSON.stringify({
	// 				id: user1
	// 			})
	// 	}).then((response) => {
	// 			var data = response.json().then((data) => {
	// 			callback(data)
	// 			})
	// 	})
	// },

	myList:(user1, callback) => {
		const baseUrl ='http://localhost:5000/seen?';
		let params = new URLSearchParams(Object.entries({
			id: user1,
		}))
		fetch(baseUrl + params, {
				method: 'GET'
				
		}).then((response) => {
				var data = response.json().then((data) => {
				callback(data)
				})
		})
	},

	checkSeen:(user, film, callback) => {
		const baseUrl ='http://localhost:5000';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		fetch(baseUrl + '/seen', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					id_user: user,
					id_film: film
				})
		}).then((response) => {
				var data = response.json().then((data) => {
				callback(data)
				})
		})
	},

	hasSeen:(user, film, rating, callback) => {
		const baseUrl ='http://localhost:5000';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		fetch(baseUrl + '/seen', {
				method: 'PUT',
				headers,
				body: JSON.stringify({
					id_user: user,
					id_film: film,
					score: rating
				})
		}).then((response) => {
				
			callback(response)
				
		})
	}

	
}
