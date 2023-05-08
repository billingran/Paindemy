const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth_controller");

// sign up
router.get("/signup", authController.signUp);

// post sign up
router.post("/signup", authController.postSignUp);

// confirm email sign up
router.get("/confirmemailsignup", authController.confirmEmailSignUp);

// confirmed email sign up
router.get("/confirmedemailsignup", authController.confirmedEmailSignUp);

// join us
router.get("/joinus", authController.joinUs);

// post join us
router.post("/joinus", authController.postJoinUs);

// confirm email join us
router.get("/confirmemailjoinus", authController.confirmEmailJoinUs);

// post confirm email join us
router.post("/confirmemailjoinus", authController.postConfirmEmailJoinUs);

// confirmed email join us
router.get("/confirmedemailjoinus", authController.confirmedEmailJoinUs);

// login
router.get("/login", authController.login);

// post login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash:
      "Erreur de connexion, le compte, mot de passe n’est pas correct ou n’existe pas.",
  }),
  authController.postLogin
);

// google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
  authController.googleAuth
);

// google login redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: "Connexion Google échouée, adresse mail existante",
  }),
  authController.googleRedirect
);

// logout
router.get("/logout", authController.logout);

//AXIOS //////////////////////////////////////////////////

// post delete one student
router.post("/deleteonestudent", authController.postDeleteOneStudent);

// post add one student
router.post("/addonestudent", authController.postAddOneStudent);

module.exports = router;
