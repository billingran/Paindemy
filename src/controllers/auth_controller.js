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

// confirm email
module.exports.confirmEmail = (req, res) => {
  // get jwt token of confirme email sign up and join us
  let { token, role } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    // validation of the token
    if (err) {
      if (role == "instructor") {
        req.flash(
          "error_msg",
          "Incrisption échouée : Le lien d'incrisption n'est plus valide."
        );
        return res.redirect("/auth/joinus");
      } else {
        req.flash(
          "error_msg",
          "Incrisption échouée : Le lien d'incrisption n'est plus valide."
        );
        return res.redirect("/auth/signup");
      }
    } else {
      return res.render("confirm_email", {
        title: "Confirmation d’adresse mail",
        showHeader: true,
        authUser: req.user,
        token,
        role,
      });
    }
  });
};

// post confirm email
module.exports.postConfirmEmail = async (req, res) => {
  try {
    // get jwt token of confirme email sign up and join us
    let { token, role } = req.body;

    userService.setConfirmEmail(
      token,
      role,
      req,
      res,
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

// confirmed email
module.exports.confirmedEmail = async (req, res) => {
  try {
    // get jwt token of confirmed email sign up and join us
    let { token, role } = req.query;

    userService.setConfirmedEmail(token, role, jwt, req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
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

// reset password
module.exports.resetPassword = (req, res) => {
  return res.render("reset_password", {
    title: "Réinitialisation du mot de passe",
    showHeader: true,
    authUser: req.user,
  });
};

// post reset password
module.exports.postResetPassword = async (req, res) => {
  try {
    // get email reset password
    let { emailUser } = req.body;

    userService.setResetPassword(
      emailUser,
      req,
      res,
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

// confirm email reset
module.exports.confirmEmailReset = (req, res) => {
  // get jwt token of confirme email
  let { token } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    // validation of the token
    if (err) {
      req.flash(
        "error_msg",
        "Réinitialisation échouée : Le lien de réinitialisation n'est plus valide."
      );
      return res.redirect("/auth/resetpassword");
    } else {
      return res.render("confirm_email_reset", {
        title: "Réinitialisation du mot de passe",
        showHeader: true,
        authUser: req.user,
        token,
      });
    }
  });
};

// post confirm email reset
module.exports.postConfirmEmailReset = async (req, res) => {
  try {
    // get jwt token of confirme email reset
    let { token } = req.body;

    userService.setConfirmEmailReset(
      token,
      req,
      res,
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

// confirmed email reset
module.exports.confirmedEmailReset = async (req, res) => {
  try {
    // get jwt token of confirmed email reset
    let { token } = req.query;

    userService.setConfirmedEmailReset(token, jwt, req, res, path);

    // return res.render("new_password", {
    //   title: "Nouveau mot de passe",
    //   showHeader: true,
    //   authUser: req.user,
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// post new password
module.exports.postNewPassword = async (req, res) => {
  try {
    // get jwt token of new password
    let { token } = req.query;

    // get new password
    let { passwordUser, confirmPasswordUser } = req.body;

    userService.setNewPassword(
      token,
      passwordUser.trim(),
      confirmPasswordUser.trim(),
      jwt,
      req,
      res,
      bcrypt
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
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

// post add one student
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
