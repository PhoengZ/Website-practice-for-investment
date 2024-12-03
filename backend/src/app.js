import express from "express";
import cors from "cors";

//import ItemRoute from "./routes/itemRoute.js";
//import MemberRoute from "./routes/memberRoute.js";

import userRoute from "./routes/userRoute.js";
//import newsRoute from "./routes/newsRoute.js";
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());
// use routes

app.use("/user", userRoute); //  /user/getTimePlayed
//app.use('/api/users', userRoute);
//app.use('/api/news', newsRoute);
//app.use('/api/news', newsRoute);
//app.use("/members", MemberRoute);

export default app;
