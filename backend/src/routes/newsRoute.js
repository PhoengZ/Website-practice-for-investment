import express from "express";

import * as project_news_control from "../controllers/project_news_controll.js";

const router = express.Router();

router.get("/find", project_news_control.getNews);

export default router;
