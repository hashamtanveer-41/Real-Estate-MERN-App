import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as dns from "node:dns";
import userRoutes from "./routes/userRoutes.js";
dotenv.config()
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB successfully")
    }).catch((err)=>{
    console.log(err)
});

app.use("/api/user",userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server started successfully on PORT ${PORT}`)
});