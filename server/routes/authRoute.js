import express from "express";
import {signin, singup} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", singup)
router.post("/signin", signin)

export default router;