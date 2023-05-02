const UserService = require("../services/User_service");
const userService = new UserService();

// image upload
const path = require("path");

// validation
const validator = require("validator");

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
    let {
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
    } = req.body;

    userService.setSignUp(
      firstnameUser.trim(),
      lastnameUser.trim(),
      emailUser.trim(),
      passwordUser.trim(),
      confirmPasswordUser.trim(),
      validator,
      req,
      res,
      bcrypt
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
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
      confirmPasswordUser,
      introductionUser,
    } = req.body;

    userService.setJoinUs(
      firstnameUser.trim(),
      lastnameUser.trim(),
      themeColorUser,
      fathUser,
      emailUser.trim(),
      passwordUser.trim(),
      confirmPasswordUser.trim(),
      introductionUser,
      validator,
      req,
      res,
      path,
      bcrypt
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//local login
module.exports.login = (req, res) => {
  return res.render("login", {
    title: "Login",
    showHeader: false,
    authUser: req.user,
  });
};

//post local login redirect
module.exports.postLogin = (req, res) => {
  let user;

  if (req.user) {
    user = req.user;
  }

  userService.setLocalLoginRedirect(user, res);
};

//google login
module.exports.googleAuth = (req, res) => {};

//google login redirect
module.exports.googleRedirect = (req, res) => {
  let user;

  if (req.user) {
    user = req.user;
  }

  userService.setGoogleLoginRedirect(user, res);
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

//AXIOS //////////////////////////////////////////////////

// post delete one student
module.exports.postDeleteOneStudent = async (req, res) => {
  try {
    // student id
    let { student_id, course_id } = req.body;

    await userService.deleteOneStudent(student_id, course_id, req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// post delete one student
module.exports.postAddOneStudent = async (req, res) => {
  try {
    // the course id and student email
    let { _id, emailUser } = req.body;

    await userService.addOneStudent(_id, emailUser, validator, req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
