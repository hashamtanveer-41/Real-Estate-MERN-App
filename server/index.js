import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config()
app.listen(PORT, ()=>{
    console.log(`Server started successfully on PORT ${PORT}`)
});