const User = require("../models/User_model");

// bcrypt
const bcrypt = require("bcrypt");

// sign up
module.exports.signUp = (req, res) => {
  return res.render("sign_up", {
    title: "Sign up",
    showHeader: false,
    authUser: req.user,
  });
};

// post sign up
module.exports.postSignUp = async (req, res) => {
  try {
    let { firstnameUser, lastnameUser, emailUser, passwordUser } = req.body;

    // validate password
    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    // validate email
    const emailFound = await User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/signup");
    }

    // bcrypt and save user
    let hashedPasswordUser = await bcrypt.hash(passwordUser, 12);
    let studentUser = new User({
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser: hashedPasswordUser,
      roleUser: "student",
    });

    await studentUser.save();
    req.flash("success_msg", "Congradulation, you are our member now.");
    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

// join us
module.exports.joinUs = (req, res) => {
  return res.render("join_us", {
    title: "Join us",
    showHeader: false,
    authUser: req.user,
  });
};

// post join us
module.exports.postJoinUs = async (req, res) => {
  try {
    let {
      firstnameUser,
      lastnameUser,
      themeColorUser,
      fathUser,
      emailUser,
      passwordUser,
      introductionUser,
    } = req.body;

    // validate password
    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    // validate email
    const emailFound = await User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/joinus");
    }

    // validate img uploaded
    let imageUploadFile;
    let uploadPath;
    let newImageName = [];

    if (!req.files || Object.keys(req.files).length < 2) {
      req.flash("error_msg", "Two images required");
      return res.redirect("/auth/joinus");
    } else if (req.files && Object.keys(req.files).length > 2) {
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
    let instructorUser = new User({
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
    res.redirect("/auth/joinus");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

//login
module.exports.login = (req, res) => {
  return res.render("login", {
    title: "Login",
    showHeader: false,
    authUser: req.user,
  });
};

//post login
module.exports.postLogin = (req, res) => {
  let user = req.user;

  if (user.roleUser == "student") {
    return res.redirect("/student/profile");
  } else if (user.roleUser == "instructor") {
    return res.redirect("/instructor/profile");
  }
};

//google
module.exports.googleAuth = (req, res) => {};

//google redirect
module.exports.googleRedirect = (req, res) => {
  let user = req.user;

  if (user.roleUser == "student") {
    return res.redirect("/student/profile");
  } else if (user.roleUser == "instructor") {
    return res.redirect("/instructor/profile");
  }
};

//logout
module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.redirect("/");
    }
  });
};
