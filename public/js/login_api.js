const APIURL = '/users/login/'
export async function login(name, email, password) {
    return fetch(APIURL, {
          method: 'post',
          //withCredentials: true,
          //credentials: 'include',
          headers: new Headers({
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + token
          }),
          body: JSON.stringify({"name":name, "email":email, "password":password})
      })
      .then(resp => {
        if(!resp.ok) {
          if(resp.status >=400 && resp.status < 500) {
            resp.json().then(data => {
              return {errorMessage: data.message};
              // throw err;
            })
          } else {
            return {errorMessage: 'Please try again later, server is not responding'};
            // throw err;
          }
        }
        if(resp.status == 200)
          location.replace("/index.html");
        return resp.json()
     }) 
  }
  