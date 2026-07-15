import express from "express";
import {singup} from "../controller/authController.js";
import {deleteUser, updateUser} from "../controller/userController.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
export default router;