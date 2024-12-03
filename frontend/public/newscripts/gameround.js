//import { application } from 'express';
//;
//import { updateScore } from './api.js';

import { updateScore } from "./api.js";
// Make functions globally available by assigning them to the window object


window.onload = () => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        //console.log("Parsed user data:", user);
        if (user.username) {
            document.querySelector('.header-bar .username').textContent = `${user.username}`;
            document.querySelector('.header-bar #balance-amount').textContent = `${user.score}`;
            //console.log("Username set in div:", user.username);
        } else {
            console.warn("Username not found in user data.");
        }
    } else {
        console.error("No user data found in sessionStorage.");
    }
    let currentRound = localStorage.getItem('game_round');
    if (!currentRound) {
        currentRound = 1;  // Default to round 1 if not set
    } else {
        currentRound = parseInt(currentRound);
    }

    // Update the price text content for each company box
    const roundIndex = currentRound - 1;  // Adjust for 0-based indexing
    const companyBoxes = document.querySelectorAll(".company-box");

    companyBoxes.forEach((box, index) => {
        // Get the price for the current company in this round
        const price = datainround[roundIndex][index];
        const priceEl = box.querySelector(".price");
        if (priceEl) {
            priceEl.textContent = `฿ ${price}`;  // Update the price
        }
    });
    // Make functions globally available by assigning them to the window object
    window.toggleCart = toggleCart;
    window.addToCart = addToCart;
    window.changeQuantity = changeQuantity;
    window.removeItem = removeItem;
    window.startCountdown = startCountdown;
    window.openModal = openModal;
    //window.closeModal = closeModal;
    window.next_db = next_db;
    const timerDisplay = document.getElementById("timer");
    startCountdown(10, timerDisplay);
    
};
let currentRound = localStorage.getItem('game_round');
const cart = [];
const datainround=[
[//Round 1
    35, // BTS
    80, // CP
    120, // CENTRAL
    150, // KBANK
    90, // GULF
    45, // 3KBATT
    75, // BDMS
    110, // TISCO
    50, // DRT
    130, // SCC
    55, // ICHI
    95, // JMART
    60, // TRUE
    40, // QH
    70  // PLANB
],
[ //Round2
    40, // BTS
    70, // CP
    100, // CENTRAL
    155, // KBANK
    80, // GULF
    39, // 3KBATT
    70, // BDMS
    110, // TISCO
    45, // DRT
    115, // SCC
    60, // ICHI
    100, // JMART
    65, // TRUE
    45, // QH
    90  // PLANB
],
[ // Round3
    50, // BTS
    68, // CP
    115, // CENTRAL
    165, // KBANK
    90, // GULF
    50, // 3KBATT
    80, // BDMS
    120, // TISCO
    40, // DRT
    15, // SCC
    60, // ICHI
    100, // JMART
    80, // TRUE
    50, // QH
    110   // PLANB
]
]

const purchasePricesround = [
[
    40, // BTS
    70, // CP
    100, // CENTRAL
    155, // KBANK
    80, // GULF
    39, // 3KBATT
    70, // BDMS
    110, // TISCO
    45, // DRT
    115, // SCC
    60, // ICHI
    100, // JMART
    65, // TRUE
    45, // QH
    90  // PLANB
],
[
    50, // BTS
    68, // CP
    115, // CENTRAL
    165, // KBANK
    90, // GULF
    50, // 3KBATT
    80, // BDMS
    120, // TISCO
    40, // DRT
    15, // SCC
    60, // ICHI
    100, // JMART
    80, // TRUE
    50, // QH
    110   // PLANB
],
[
    45, // BTS
    75, // CP
    100, // CENTRAL
    155, // KBANK
    80, // GULF
    42, // 3KBATT
    88, // BDMS
    115, // TISCO
    37, // DRT
    14, // SCC
    57, // ICHI
    95, // JMART
    75, // TRUE
    48, // QH
    95  // PLANB
]
];

// ฟังก์ชันคำนวณยอดรวมในตะกร้า
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ฟังก์ชันแสดงยอดเงินรวม
function updateTotalDisplay() {
    const totalAmount = calculateTotal();
    const totalDisplay = document.querySelector(".totalmoney");
    totalDisplay.textContent = `รวมเป็นเงิน : ฿${totalAmount}`;
}

// ฟังก์ชันเปิดปิด Sidebar
function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
    document.getElementById("cart-sidebar-overlay").classList.toggle("active");
    updateCartDisplay();
    updateTotalDisplay();
}

function addToCart(id, name) {
    const amountEl = document.querySelector(`.company-box[data-id="${id}"] .amount`);
    let quantity = parseInt(amountEl.innerText);
    let roundIndex = parseInt(currentRound) - 1;
    let price = datainround[roundIndex][id-1];
    const priceEl = document.querySelector(`.company-box[data-id="${id}"] .price`);
    priceEl.textContent = `฿ ${price}`;
    const totalAmount = calculateTotal() + (price * quantity);
    const userBalance = parseFloat(document.getElementById("balance-amount").textContent);

    // ตรวจสอบเงินคงเหลือว่าเพียงพอหรือไม่
    if (totalAmount > userBalance) {
        alert("เงินไม่พอสำหรับการซื้อสินค้าชิ้นนี้");
        return; // หยุดการเพิ่มสินค้า
    }

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    amountEl.innerText = '1';
    // เพิ่มแอนิเมชันเมื่อกดปุ่ม
    const buyButton = document.querySelector(`.company-box[data-id="${id}"] .buybtn`);
    buyButton.classList.add('clicked'); // เพิ่มคลาสที่ทำให้ปุ่มมีแอนิเมชัน

    // ลบคลาสแอนิเมชันหลังจาก 0.5 วินาที (เพื่อให้แอนิเมชันเสร็จสิ้น)
    setTimeout(() => {
        buyButton.classList.remove('clicked');
    }, 500);
    updateCartDisplay();
    updateTotalDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.classList.add("cart-item");
        itemEl.dataset.itemId = item.id;
        itemEl.innerHTML = `
                    <p class="nameofcom">${item.name}</p>
                    <span class="priceofcom">ราคา: ฿${item.price}</span>
                    <br>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span id="quantity-${item.id}">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${item.id})">ลบ</button>
                `;
        cartItemsContainer.appendChild(itemEl);
    });
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const currentTotal = calculateTotal();
        const itemTotalPrice = item.price * item.quantity;
        const newTotal = currentTotal + (item.price * change);

        // ตรวจสอบยอดเงินรวมกับยอดเงินคงเหลือ
        const userBalance = parseFloat(document.getElementById("balance-amount").textContent);
        if (newTotal > userBalance) {
            alert("เงินไม่พอที่จะเพิ่มจำนวนสินค้า");
            return; // หยุดการเปลี่ยนแปลงจำนวน
        }

        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(id);
        }
    }
    updateCartDisplay();
    updateTotalDisplay();
}

function removeItem(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
    updateTotalDisplay();
}

document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (event) => {
        const amountEl = event.target.closest(".company-box").querySelector(".amount");
        amountEl.innerText = parseInt(amountEl.innerText) + 1;
    });
});

document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (event) => {
        const amountEl = event.target.closest(".company-box").querySelector(".amount");
        const currentAmount = parseInt(amountEl.innerText);
        if (currentAmount > 1) { // เพื่อไม่ให้จำนวนลดลงต่ำกว่า 1
            amountEl.innerText = currentAmount - 1;
        }
    });
});

function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const countdownInterval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            display.textContent = "00:00";
            
            let currentRound = localStorage.getItem('game_round');
            if (currentRound === null) {currentRound = 1;} 
            else {currentRound = parseInt(currentRound, 10) + 1; }
            localStorage.setItem('game_round', currentRound);
            
            openModal()
        }
    }, 1000);
}

var pf = 0;
async function next_db() {
    
    try {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            const username = user.username;
            let newScore = user.score; // Assuming the total money from the cart should be the new score

            // Calculate the new score
            /*
            cart.forEach((element) => {
                
                newScore = newScore - (element.quantity * element.price); // Deduct the total price from the score
                
                let currentRound = localStorage.getItem('game_round');
                let roundIndex = parseInt(currentRound, 10) - 1;
                let stockIndex = parseInt(getStockIndexByName(element.name), 10);
                let purchasePrice = parseInt(purchasePricesround[roundIndex][stockIndex], 10);
                let profitLossValue = (purchasePrice-element.price) * element.quantity;
                //newScore = newScore + profitLossValue;
            });
            */
            newScore = newScore+pf;
            // Update score by calling the backend
            const updateResponse = await updateScore(username, newScore);

            // Update sessionStorage with the new score
            if (updateResponse && updateResponse.user) {
                user.score = updateResponse.user.score; // Update the score in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user));
            }
            
            let currentRound = localStorage.getItem('game_round');
            if(currentRound >= 4){
                window.location.href = 'leaderboard.html';
            }
            else{
                window.location.href = 'newsboardround1.html'; // Redirect after updating score
            }

        } else {
            console.error("No user data found in sessionStorage.");
        }
    } catch (error) {
        console.error("Error updating score:", error.message);
    }
}

function getStockIndexByName(stockName) {
    const stockNames = [
        "BTS", "CPALL", "CPN", "KBAN", "GULF", "3KBATT", "BDMS", "TISCO", "DRT", "SCC", "ICHI", "JMART", "TRUE", "QH", "PLANB"
    ];
    return stockNames.indexOf(stockName);
}


function openModal() {
    const modal = document.getElementById("newsModal");
    const recordElement = document.querySelector('.record');
    const modalTitle = document.getElementById("modalTitle");

    // สร้างหัวข้อใน modal
    const lt = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = "หุ้น";
    name.className = "name";
    const quan = document.createElement('span');
    quan.textContent = "จำนวน";
    quan.className = "quantity";
    const price = document.createElement('span');
    price.textContent = "ราคา";
    price.className = "price";
    const profitLoss = document.createElement('span');
    profitLoss.textContent = "กำไร/ขาดทุน";
    profitLoss.className = "profit-loss";
    lt.appendChild(name);
    lt.appendChild(quan);
    lt.appendChild(price);
    lt.appendChild(profitLoss);
    recordElement.appendChild(lt);

    // ดึงรอบที่ผู้ใช้กำลังเล่น
    let roundIndex = parseInt(currentRound) - 1;  // เนื่องจาก array เริ่มจาก 0
    let pricetotal = 0;
    cart.forEach((element) => {
        const listItem = document.createElement('li');
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = element.name;

        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'quantity';
        scoreSpan.textContent = element.quantity;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'price';
        priceSpan.textContent = (element.quantity * element.price).toString().trim();

        // คำนวณกำไร/ขาดทุนc
        const stockIndex = parseInt(getStockIndexByName(element.name));
        const purchasePrice = parseInt(purchasePricesround[roundIndex][stockIndex]);
        const profitLossValue = (purchasePrice - element.price) * element.quantity;
        pricetotal = pricetotal +profitLossValue;
        const profitLossSpan = document.createElement('span');
        profitLossSpan.className = 'profit-loss';
        profitLossSpan.textContent = `฿${profitLossValue.toFixed(2)}`;

        listItem.appendChild(nameSpan);
        listItem.appendChild(scoreSpan);
        listItem.appendChild(priceSpan);
        listItem.appendChild(profitLossSpan);
        recordElement.appendChild(listItem);
    });
    pf = pricetotal;
    modalTitle.textContent = "หมดเวลา";
    modal.style.display = "block";
    const newFeatureButton = document.getElementById("new-feature-button");
    if (newFeatureButton) {
        newFeatureButton.style.display = "inline-block";
    }
    /*document.querySelector('#concludeprofit' ).textContent = `${pricetotal}`;*/
    const concludeProfitElement = document.querySelector('#concludeprofit');
    concludeProfitElement.textContent = `${pricetotal}`;
    
    // เปลี่ยนสีของผลประกอบการตามค่าที่คำนวณได้
    if (pricetotal < 0) {
        concludeProfitElement.style.color = "red";
    } else {
        concludeProfitElement.style.color = "green";
    }
}

/*function closeModal() {
  const modal = document.getElementById("newsModal");
  //window.location.href = 'newsboardround1.html';
  modal.style.display = "none";
}*/

/*window.onclick = function(event) {
    const modal = document.getElementById("newsModal");
    //window.location.href = 'newsboardround1.html';
    if (event.target == modal) {
      modal.style.display = "none";
    }
}*/