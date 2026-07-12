import express from "express";
import {singup} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", singup)

export default router;