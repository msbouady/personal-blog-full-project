import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
  })
);

router.post("/register", registerUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/index",
  passport.authenticate("google", {
    successRedirect: "/index",
    failureRedirect: "/login",
  })
);

export default router;
