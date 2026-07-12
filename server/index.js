import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as dns from "node:dns";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoute.js";
dotenv.config()
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB successfully")
    }).catch((err)=>{
    console.log(err)
});

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server started successfully on PORT ${PORT}`)
});