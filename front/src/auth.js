
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
		}

		
}

