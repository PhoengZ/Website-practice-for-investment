import { BACKEND_URL } from "./config.js";

export async function createUser(user) {
  try {
    const response = await fetch(`${BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }
    return await response.json(); // Return the response data if needed
  } catch (error) {
    console.error("Failed to create user:", error.message);
    throw error;
  }
}

export async function getUser(user, password) {
  const queryParams = new URLSearchParams();
  queryParams.append("username", user);
  queryParams.append("password", password);
  const User = await fetch(`${BACKEND_URL}/user?${queryParams.toString()}`).then((r) => r.json());
  return User;
}

export async function getTopPlayers() {
  try {
    const response = await fetch(`${BACKEND_URL}/user/top`); //request of the /top
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const topPlayers = await response.json();
    return topPlayers;
  } catch (error) {
    console.error('Error fetching top players:', error);
    return [];
  }
}

export async function getNews() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/news/find`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const news_ans = await response.json();
    return news_ans;
  } catch (error) {
    console.error('Error fetching News:', error);
    return [];
  }
}


export async function SetTimePlayed(username) {
  try {
    const response = await fetch(`${BACKEND_URL}/user/updateTimePlayed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }), 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating time_played:', error);
    return null;
  }
}
export async function updateScore(username, newScore) {
  try {
      const response = await fetch(`${BACKEND_URL}/user/updateScore`, {
          method: "PUT", // Update method, you might use PATCH or POST depending on your API
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: username,
              score: newScore,
          }),
      });

      if (!response.ok) {
          throw new Error('Error updating score');
      }

      return await response.json(); // Returns the updated user data
  } catch (error) {
      console.error("Error updating score:", error.message);
      throw error; // Rethrow the error to handle it further up
  }
}

// Function to update the score in the backend

