import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as dns from "node:dns";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import listingRoutes from "./routes/listingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config()
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB successfully")
    }).catch((err)=>{
    console.log(err)
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/listing",listingRoutes)
app.use("/api/upload",uploadRoutes)

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get(/(.*)/,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
} )

app.listen(PORT, ()=>{
    console.log(`Server started successfully on PORT ${PORT}`)
});