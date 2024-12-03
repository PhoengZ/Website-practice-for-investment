import { createConnection } from "net";
import User from "../models/project_userModel.js";

export async function createUser(req, res) {
  try { //ดึงข้อมูล
    const { username, password, score, time_played } = req.body;

    const newUser = new User({
      username,
      password,
      score,
      time_played,
    });

    //บันทึดลง db
    await newUser.save();

    //ส่ง response
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.query;

    // ตรวจสอบว่ามีการส่ง username และ password มาหรือไม่
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    // สร้าง query สำหรับการค้นหา
    const query = { username, password };

    // ค้นหาผู้ใช้ตาม query
    const filteredUsers = await User.find(query);

    // ส่งข้อมูลผู้ใช้กลับไป
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const getLeader = async (req, res) => {
  try {
    const leaders = await User.find({})
      .sort({ score: -1 })
      .limit(5)
      .select('username score -_id');
    res.status(200).json(leaders); //send the data of players leader
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export async function updateTimePlayed(req, res) {
  try {
    // ดึงข้อมูลจาก req.body หรือ req.params ขึ้นอยู่กับวิธีการส่งข้อมูล
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.time_played = user.time_played + 1;

    // บันทึกการเปลี่ยนแปลง
    await user.save();

    // ส่ง response กลับไปยัง client
    res.status(200).json({ message: "time_played updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating time_played" });
  }
}


export const updateScore = async (req, res) => {
  try {
      const { username, score } = req.body;

      // Find the user by username and update the score
      const updatedUser = await User.findOneAndUpdate(
          { username: username },
          { $set: { score: score } },
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user: updatedUser }); // Return the updated user
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating score' });
  }
};







