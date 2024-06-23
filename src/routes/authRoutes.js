import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/articles.ejs",
    failureRedirect: "/login.ejs",
  })
);

router.post("/register.ejs", registerUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/articles.ejs",
  passport.authenticate("google", {
    successRedirect: "/articles.ejs",
    failureRedirect: "/login.ejs",
  })
);

export default router;
