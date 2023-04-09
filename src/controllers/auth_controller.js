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

    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    const emailFound = await User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/signup");
    }

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
      imageUser,
    } = req.body;

    if (passwordUser.length < 8) {
      req.flash(
        "error_msg",
        "Password too short, at least 8 letters or numbers."
      );
      return res.redirect("/auth/signup");
    }

    const emailFound = await User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Account exist.");
      return res.redirect("/auth/joinus");
    }

    let hashedPasswordUser = await bcrypt.hash(passwordUser, 12);
    let instructorUser = new User({
      firstnameUser,
      lastnameUser,
      themeColorUser,
      fathUser,
      emailUser,
      passwordUser: hashedPasswordUser,
      introductionUser,
      imageUser,
      roleUser: "instructor",
    });

    await instructorUser.save();
    console.log(instructorUser);
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
