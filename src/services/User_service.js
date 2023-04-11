const DbService = require("./Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");
const UserEntity = require("../entities/User_entity");

class UserService extends DbService {
  constructor() {
    super();
  }
  // Auth//////////////////////////////////////////////////
  // post sign up
  async setSignUp(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    req,
    res,
    bcrypt
  ) {
    // validate password
    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    // validate email
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/signup");
    }

    // bcrypt and save user
    let hashedPasswordUser = await bcrypt.hash(passwordUser, 12);
    let studentUser = new this.User({
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser: hashedPasswordUser,
      roleUser: "student",
    });

    await studentUser.save();

    req.flash("success_msg", "Congradulation, you are our member now.");
    res.redirect("/auth/login");
  }

  // post join us
  async setJoinUs(
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    passwordUser,
    introductionUser,
    req,
    res,
    bcrypt
  ) {
    // validate password
    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    // validate email
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/joinus");
    }

    // validate img uploaded
    let imageUploadFile;
    let uploadPath;
    let newImageName = [];

    if (!req.files || Object.keys(req.files.imageUser).length < 2) {
      req.flash("error_msg", "Two images required");
      return res.redirect("/auth/joinus");
    } else if (req.files && Object.keys(req.files.imageUser).length > 2) {
      req.flash("error_msg", "you can only upload two images");
      return res.redirect("/auth/joinus");
    } else {
      imageUploadFile = req.files.imageUser;

      imageUploadFile.forEach((img, index) => {
        newImageName.push(Date.now() + imageUploadFile[index].name);
      });

      newImageName.forEach((img, index) => {
        uploadPath = require("path").resolve("./") + "/public/uploads/" + img;

        imageUploadFile[index].mv(uploadPath, function (err) {
          if (err) return res.satus(500).send(err);
        });
      });
    }

    // bcrypt and save user
    let hashedPasswordUser = await bcrypt.hash(passwordUser, 12);
    let instructorUser = new this.User({
      firstnameUser,
      lastnameUser,
      themeColorUser,
      fathUser,
      emailUser,
      passwordUser: hashedPasswordUser,
      introductionUser,
      imageUser: newImageName,
      roleUser: "instructor",
    });

    await instructorUser.save();

    req.flash("success_msg", "Congradulation, you are our member now.");
    res.redirect("/auth/login");
  }

  // local login
  async setLocalLogin(username, bcrypt, password, done) {
    let userFound = await this.User.findOne({ emailUser: username });
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
  }

  // local login redirect
  setLocalLoginRedirect(user, res) {
    if (user.roleUser == "student") {
      return res.redirect("/student/profile");
    } else if (user.roleUser == "instructor") {
      return res.redirect("/instructor/profile");
    }
  }

  //google login
  async setGoogleLogin(profile, userTypeGoogle, done) {
    let userFound = await this.User.findOne(userTypeGoogle);

    if (userFound) {
      // func serializeUser
      // save user on session, sign id of user, and then send it in cookie
      done(null, userFound);
    } else {
      userFound = new this.User({
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
  }

  //google login redirect
  setGoogleLoginRedirect(user, res) {
    if (user.roleUser == "student") {
      return res.redirect("/student/profile");
    } else if (user.roleUser == "instructor") {
      return res.redirect("/instructor/profile");
    }
  }

  // serializeUser
  async serializeUser(passport) {
    passport.serializeUser((user, done) => {
      // func deserializeuser
      //set req.user = user, req.isAuthenticated() = true, req.logout is generated
      done(null, user._id);
    });
  }

  // deserializeUser
  async deserializeUser(passport) {
    passport.deserializeUser(async (_id, done) => {
      let foundUser = await this.User.findOne({ _id });
      done(null, foundUser);
    });
  }
}

module.exports = UserService;
