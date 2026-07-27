import express from "express";
import {getListings, createListing, deleteListing, updateListing,getListing} from "../controller/listingController.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.post("/new",verifyToken, createListing )
router.delete("/delete/:id",verifyToken, deleteListing )
router.put("/:id", verifyToken, updateListing)
router.get("/:id", getListing)
router.get("/", getListings)
export default router;
