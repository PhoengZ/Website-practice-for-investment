import { getTopPlayers } from "./api.js";

async function displayLeaderboard() {
    const leaderboardElement = document.querySelector('.leaderboard');
    const topPlayers = await getTopPlayers();
  
    // ล้างข้อมูลเก่า
    leaderboardElement.innerHTML = '';
  
    topPlayers.forEach((player) => {
      const listItem = document.createElement('li');
  
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('name');
      nameSpan.textContent = player.username;
  
      const scoreSpan = document.createElement('span');
      scoreSpan.classList.add('score');
      scoreSpan.textContent = player.score;
  
      listItem.appendChild(nameSpan);
      listItem.appendChild(scoreSpan);
      leaderboardElement.appendChild(listItem);
    });
  }
  
  displayLeaderboard();