// Class Services
// const AuthService = require("../services/auth_service");
// authService = new AuthService();
const User = require("../models/User_model");

//passport auth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

// serializeuser and passport.deserializeuser``
passport.serializeUser((user, done) => {
  // func deserializeuser
  //set req.user = user, req.isAuthenticated() = true, req.logout is generated
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  let foundUser = await User.findOne({ _id });
  done(null, foundUser);
});

// route setting
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
        let userFound = await User.findOne(userTypeGoogle);

        if (userFound) {
          // func serializeuser
          // save user on session, sign id of user, and then send it in cookie
          done(null, userFound);
        } else {
          userFound = new User({
            firstnameUser: profile.name.givenName,
            lastnameUser: profile.name.familyName || "   ",
            emailUser: profile.emails[0].value,
            googleIDUser: profile.id,
            imageUser: profile.photos[0].value,
            roleUser: "student",
          });

          let userGoogle = await userFound.save();

          // func serializeuser
          // save user on session, sign id of user, and then send it in cookie
          done(null, userGoogle);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
