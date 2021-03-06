const APIURL = '/memo/'
//import * as apiCalls from './api';
//  async loadTodos(){
//     let todos = await apiCalls.getTodos();
//     this.setState({todos});
//  }


export async function createAMemo(newMemo={}) {
  const token = localStorage.token
  console.log(token);
  return fetch(APIURL, {
        method: 'post',
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        }),
        body: JSON.stringify(newMemo)
    })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status == 401)
          location.replace("/login.html")
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

export async function loadAMemo(id) {
  const token = localStorage.token
  return fetch(APIURL+id, {
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
        if(resp.status == 401)
          location.replace("/login.html");
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json()
   }) 
}

export async function loadAllMemos() {
  const token = localStorage.token
  return fetch(APIURL, {
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
        if(resp.status == 401)
          location.replace("/login.html");
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json()
   }) 
}

export async function updateAMemo(memo) {
  const token = localStorage.token
  return fetch(APIURL+memo._id, {
        method: 'PATCH', // be careful, "PATCH" is case-sensitive
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        }),
        body: JSON.stringify({...memo})
    })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status == 401)
          location.replace("/login.html");
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json()
   }) 
}

export async function deleteAMemo(id) {
  const token = localStorage.token
  return fetch(APIURL+id, {
        method: 'delete',
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        })
    })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status == 401)
          location.replace("/login.html");
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json()
   }) 
}

export async function deleteAllMemos() {
  const token = localStorage.token
  return fetch(APIURL, {
        method: 'delete',
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        })
    })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status == 401)
          location.replace("/login.html");
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json()
   }) 
}
