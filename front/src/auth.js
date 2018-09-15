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
    }

    
}

