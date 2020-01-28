import * as api from './login_api.js';

document.getElementById("btn_login").addEventListener("click", async () => {

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const result = await api.login(name, email, password)
    storeToken(result.token)
})

const storeToken = (token) => {
    localStorage.setItem('token', token)

}


