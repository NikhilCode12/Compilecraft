import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

// Passport initialization and serialization/deserialization

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      authorizationURL: "https://accounts.google.com/o/oauth2/auth",
      tokenURL: "https://accounts.google.com/o/oauth2/token",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (error) {
        // Handle any errors that might occur during authentication
        console.error("Error in Google OAuth2 authentication:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;
