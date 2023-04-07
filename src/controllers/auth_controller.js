const passport = require("passport");

// sign up
module.exports.signUp = (req, res) => {
  res.render("sign_up", { title: "Sign Up" });
};

//login
module.exports.login = (req, res) => {
  res.render("login", { title: "Login" });
};

//google
module.exports.google = (req, res) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  });
};

// join us
module.exports.joinUs = (req, res) => {
  res.render("join_us", { title: "Join Us" });
};
