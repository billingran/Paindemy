const UserService = require("../services/User_service");
const userService = new UserService();

// validation
const validator = require("validator");

// bcrypt
const bcrypt = require("bcrypt");

//node mailer
const nodeMailer = require("nodemailer");

// juice
const juice = require("juice");
const { Console } = require("console");

// image upload
const path = require("path");
const fs = require("fs");

// jwt
const jwt = require("jsonwebtoken");

//ejs
const ejs = require("ejs");

// sign up
module.exports.signUp = (req, res) => {
  return res.render("sign_up", {
    title: "Créer un compte",
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
      bcrypt,
      nodeMailer,
      juice,
      jwt,
      fs,
      path,
      ejs
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// confirm email sign up
module.exports.confirmEmailSignUp = (req, res) => {
  return res.render("confirm_email_signup", {
    title: "Élève confirmation d’adresse mail",
    showHeader: true,
    authUser: req.user,
  });
};

// confirmed email sign up
module.exports.confirmedEmailSignUp = (req, res) => {
  // get jwt token of confirmed email sign up
  let { token } = req.query;

  userService.setConfirmedEmailSignUp(token, jwt, req, res);
};

// join us
module.exports.joinUs = (req, res) => {
  return res.render("join_us", {
    title: "Rejoignez-nous",
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
      bcrypt,
      nodeMailer,
      juice,
      jwt,
      fs,
      ejs
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// confirm email join us
module.exports.confirmEmailJoinUs = (req, res) => {
  // get jwt token of confirme email join us
  let { token } = req.query;

  return res.render("confirm_email_joinus", {
    title: "Instructeur confirmation d’adresse mail",
    showHeader: true,
    authUser: req.user,
    token,
  });
};

// post confirm email join us
module.exports.postConfirmEmailJoinUs = (req, res) => {
  // get jwt token of confirme email join us
  // let { token } = req.query;
  console.log(req.body);
};

// confirmed email join us
module.exports.confirmedEmailJoinUs = (req, res) => {
  // get jwt token of confirmed email join us
  let { token } = req.query;

  userService.setConfirmedEmailJoinUs(token, jwt, req, res);
};

//local login
module.exports.login = (req, res) => {
  return res.render("login", {
    title: "Se connecter",
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
