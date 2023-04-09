const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth_controller");

// sign up
router.get("/signup", authController.signUp);

// post sign up
router.post("/signup", authController.postSignUp);

// login
router.get("/login", authController.login);

// post login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "login failure, your account or password is not correct.",
  }),
  authController.postLogin
);

// google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
  authController.googleAuth
);

// google redirect
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  authController.googleRedirect
);

// join us
router.get("/joinus", authController.joinUs);

module.exports = router;

// logout
router.get("/logout", authController.logout);
