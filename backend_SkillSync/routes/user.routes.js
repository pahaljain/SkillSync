import express from "express";
import { login } from "../controllers/auth.controller.js";
import { getAllUsers, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

// Route for user login
router.post("/login", login);

// Route for registering a new user (admin or trainer)
router.post("/signup", registerUser);

// Route to get all users (admin access only)
router.get("/", getAllUsers);

export default router;