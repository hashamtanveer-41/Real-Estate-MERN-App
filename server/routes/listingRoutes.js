import express from "express";
import {createListing, deleteListing, updateListing} from "../controller/listingController.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.post("/new",verifyToken, createListing )
router.delete("/delete/:id",verifyToken, deleteListing )
router.put("/:id", verifyToken, updateListing)
export default router;
