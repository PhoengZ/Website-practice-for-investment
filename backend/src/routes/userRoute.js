import express from "express";

import * as project_user_control from "../controllers/project_user_control.js";

const router = express.Router();

router.get("/", project_user_control.getUser);
router.post("/", project_user_control.createUser);
router.get("/top", project_user_control.getLeader);
router.get("/getTimePlayed", project_user_control.updateTimePlayed);
router.put('/updateScore', project_user_control.updateScore);

export default router;

