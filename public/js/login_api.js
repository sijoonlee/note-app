const APIURL = '/users/'
export async function login(email, password) {
    return fetch(APIURL + 'login/', {
          method: 'post',
          headers: new Headers({
          'Content-Type': 'application/json',
          }),
          body: JSON.stringify({"email":email, "password":password})
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

export async function logout() {
    const token = localStorage.token
    return fetch(APIURL + 'logout/', {
      method: 'get',
      withCredentials: true,
      credentials: 'include',
      headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
      })
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
      return resp.json()
    }) 
}
  