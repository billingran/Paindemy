// Class Services
// const AuthService = require("../services/auth_service");
// authService = new AuthService();
const User = require("../models/User_model");

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
        let userFound = await User.findOne(userTypeGoogle);

        if (userFound) {
          // func serializeUser
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

          // func serializeUser
          // save user on session, sign id of user, and then send it in cookie
          done(null, userGoogle);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// route setting of local login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    let userFound = await User.findOne({ emailUser: username });
    if (userFound) {
      let passwordCompared = await bcrypt.compare(
        password,
        userFound.passwordUser
      );
      if (passwordCompared) {
        // func serializeUser
        done(null, userFound);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  })
);
