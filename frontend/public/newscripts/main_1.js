import {login} from "./js_homepage.js";
const loginButton = document.querySelector('.log');
  loginButton.addEventListener('click', ()=>{
    login();
});