import express from "express";
import { createListing } from "../controllers/listing.controler.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);

export default router;
