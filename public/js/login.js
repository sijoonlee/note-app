import * as api from './login_api.js';

document.getElementById("btn_login").addEventListener("click", async () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const result = await api.login(email, password)
    storeToken(result.token)
})

const storeToken = (token) => {
    localStorage.setItem('token', token)
}