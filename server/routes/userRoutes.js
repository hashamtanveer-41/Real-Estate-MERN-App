import express from "express";
import {singup} from "../controller/authController.js";
import {deleteUser, getUserlising, updateUser} from "../controller/userController.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserlising);
export default router;