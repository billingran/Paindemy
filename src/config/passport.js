// Class Services
// const AuthService = require("../services/auth_service");
// authService = new AuthService();
const User = require("../models/User_model");

//passport auth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

// serializeuser and passport.deserializeuser``
passport.serializeUser((user, done) => {
  console.log("Serialize使用者...");
  console.log(user);
  // func deserializeuser
  done(null, user._id); //將 mongoDB 的 id，存在 session
  //並且將 id 簽名後，以Cookie 的形式給使用者...
});

passport.deserializeUser(async (_id, done) => {
  console.log(
    "Deserialize使用者。。。使用serializeUser儲存的id，去找到資料庫的資料"
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); //將 req.user 這個屬性設定為 foundUser //req.isAuthenticated() 被製作出來 //req.logOut()被製作出來
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
          done(null, userFound);
        } else {
          userFound = new User({
            firstnameUser: profile.displayName,
            lastnameUser: profile.displayName,
            emailUser: profile._json.email,
            googleIDUser: profile.id,
            imageUser: profile._json.picture,
            roleUser: "student",
          });
          let userGoogle = await userFound.save();

          // func serializeuser
          done(null, userGoogle);
        }
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
    }
  )
);
