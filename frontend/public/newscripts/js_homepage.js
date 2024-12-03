import { getUser, SetTimePlayed } from "./api.js";

export function login() {
    const user = document.getElementById('username').value;
    const pass_1 = document.getElementById('password').value;
    
    localStorage.removeItem('game_round');
    let currentRound = localStorage.getItem('game_round');
    if (currentRound === null) {currentRound = 1;} 
    else {currentRound = parseInt(currentRound, 10) + 1;}
    localStorage.setItem('game_round', currentRound);
    CheckUser(user, pass_1);
}

async function CheckUser(username, password) {

    try {
        const user = await getUser(username,password);
        //console.log("Retrieved user from getUser:", user);
        if (user && user.length > 0 && user[0].username){
            sessionStorage.setItem('user', JSON.stringify(user[0]));
            window.location.href = 'newsboardround1.html';
            console.log("Login successful");
            Set(username);
            
        }else{
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            console.log("Failed");
        }
        
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById('error-message').textContent = "เกิดข้อผิดพลาดในการลงทะเบียน";
    }
}

async function Set(username) {
    try {
        const result = await SetTimePlayed(username); 
        if (result && result.message) {
            console.log(result.message);
        }
    } catch (error) {
        console.error("Error during updating time_played:", error);
        document.getElementById('error-message').textContent = "เกิดข้อผิดพลาดในการอัปเดตเวลาเล่น";
    }
}
