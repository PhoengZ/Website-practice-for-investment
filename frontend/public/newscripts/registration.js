import { createUser } from "./api.js";

/*document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.bt');
    submitButton.addEventListener('click', submitForm);
});*/

export function submitForm() {
    const user = document.getElementById('user').value;
    const pass_1 = document.getElementById('pass_1').value;
    const pass_2 = document.getElementById('pass_2').value;
    const errorMessage = document.getElementById('error-message');

    if (pass_1 !== pass_2 || user === '') {
        errorMessage.textContent = "พาสเวิร์ดไม่ตรงกันหรือลืมใส่ Username";
        document.getElementById('user').value = ''; 
        document.getElementById('pass_1').value = ''; 
        document.getElementById('pass_2').value = ''; 
        return; 
    }
    
    addUser(user, pass_1);
}

async function addUser(username, password) {
    const payload = {
        username: username,
        password: password,
        score: 500,
        time_played: 0,
    };

    try {
        await createUser(payload);
        window.location.href = 'index.html';
        console.log("Registration successful");
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById('error-message').textContent = "เกิดข้อผิดพลาดในการลงทะเบียน";
    }
}




