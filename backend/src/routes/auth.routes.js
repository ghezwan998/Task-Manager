import { register, login, logout, refresh } from "../controllers/auth.controllers.js";
import express from "express";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout); 

router.post("/refresh", refresh);

export default router;