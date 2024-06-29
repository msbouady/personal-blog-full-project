import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { 
    findUserByEmail, 
    getUserById, 
    addUser } from "../models/postModels.js";
    
dotenv.config();

passport.use(
  'local',
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) return done(null, false); //, { message: "User not found" }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)  return done(null, false);//, { message: "Invalid password" }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.MY_PORT}/auth/google/index`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await findUserByEmail(profile.email);
        if (!user) {
          user = await addUser(profile.name, profile.email, "google");
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }    
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport; 
