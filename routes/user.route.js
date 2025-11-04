// routes/user.route.js
import express from "express";
import multer from "multer";
import { deleteUser, updateUser } from "../controllers/auth.controler.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// PUT /api/user/:id
router.put("/:id", upload.single("image"), updateUser);

// DELETE /api/user/:id - Delete user
router.delete("/:id", deleteUser);

export default router;
