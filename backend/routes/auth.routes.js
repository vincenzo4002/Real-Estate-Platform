import express from "express";
import { getMe, register, login, resetPassword, verifyEmail, forgotPassword } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/me", protect, getMe);
authRouter.get("/verify-email", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
