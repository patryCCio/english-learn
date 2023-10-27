import express from "express";
import { getUser, login, logout, register } from "../controllers/auth.js";

const router = express.Router();

router.get("/user", getUser);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;