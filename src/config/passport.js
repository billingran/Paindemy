// Class Services
const UserService = require("../services/User_service");
const userService = new UserService();

//passport auth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");

// bcrypt
const bcrypt = require("bcrypt");

// serializeuser
passport.serializeUser((user, done) => {
  // func deserializeuser
  //set req.user = user, req.isAuthenticated() = true, req.logout is generated
  done(null, user._id);
});

// deserializeUser
passport.deserializeUser(async (_id, done) => {
  let foundUser = await User.findOne({ _id });
  done(null, foundUser);
});

// route setting of google login
passport.use(
  // auto authentication and profile function
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userTypeGoogle = { googleIDUser: profile.id };
        userService.setGoogleLogin(profile, userTypeGoogle, done);
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
    }
  )
);

// route setting of local login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    userService.setLocalLogin(username, bcrypt, password, done);
  })
);
