import { register, login, logout, refresh, getProfile } from "../controllers/auth.controllers.js";
import express from "express";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout); 

router.get("/refresh", refresh);

export default router;