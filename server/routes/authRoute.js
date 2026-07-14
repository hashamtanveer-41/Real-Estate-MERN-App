import express from "express";
import {google, signin, singup} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", singup)
router.post("/signin", signin)
router.post("/google", google)

export default router;