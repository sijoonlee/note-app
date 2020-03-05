import * as api from './login_api.js';

const logout = document.getElementsByClassName("logout")[0];
logout.addEventListener("click", async ()=>{
    const result = await api.logout();
    deleteToken();
    location.replace("/login.html");
})

const deleteToken = () => {
    localStorage.removeItem('token');
}