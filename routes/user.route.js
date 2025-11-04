// routes/user.route.js
import express from "express";
import multer from "multer";
import { updateUser } from "../controllers/auth.controler.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// PUT /api/user/:id
router.put("/:id", upload.single("image"), updateUser);

export default router;
