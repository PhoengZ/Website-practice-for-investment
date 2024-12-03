import {submitForm} from "./registration.js";
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector('.bt');
  submitButton.addEventListener('click', ()=>{
    submitForm();
  });
});

