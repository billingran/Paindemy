// dotenv
const dotenv = require("dotenv").config();

// node-cron
const cron = require("node-cron");

// image upload
const path = require("path");
const fs = require("fs");

// express
const express = require("express");
const app = express();

//session
const session = require("express-session");

//flash message
const flash = require("connect-flash");

//passport auth
const passport = require("passport");

// ejs
const expressLayouts = require("express-ejs-layouts");

// fild upload
const fileUpload = require("express-fileupload");

//method override
const methodOverride = require("method-override");

//cors
const cors = require("cors");

// Class Services
const CourseService = require("./src/services/Course_service");
const courseService = new CourseService();
const FavoriteService = require("./src/services/Favorite_service");
const favoriteService = new FavoriteService();
const UserService = require("./src/services/User_service");
const userService = new UserService();

// routes
const authRoutes = require("./src/routes/auth_routes");
require("./src/config/passport");
const courseRoutes = require("./src/routes/course_routes");
const instructorRoutes = require("./src/routes/instructor_routes");
const studentRoutes = require("./src/routes/student_routes");
const homePage = require("./src/routes/home_routes");

//Connect to mongodb alts
require("./src/models/database");

// auth check instructor
const authCheckInstructor = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleUser == "instructor") {
    next();
  } else {
    req.flash(
      "error_msg",
      "Vous devez d’abord créer un compte pour être un enseignant."
    );
    return res.redirect("/auth/joinus");
  }
};

// auth check student
const authCheckStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleUser == "student") {
    next();
  } else {
    req.flash(
      "error_msg",
      "Vous devez d’abord créer un compte pour être un étudiant."
    );
    return res.redirect("/auth/signup");
  }
};

// Middleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: Infinity },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware flash message
app.use(flash());
app.use((req, res, next) => {
  // flash message
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

// My middleware
// get all registered courses
app.use(async (req, res, next) => {
  try {
    if (req.user && req.user.roleUser == "student") {
      // registered courses student
      const coursesTypeStudent = { studentsCourse: req.user._id };
      req.user.coursesRegistered = await courseService.getAllCourses(
        coursesTypeStudent
      );

      // id registered courses student
      req.user.idCoursesRegistered = req.user.coursesRegistered.map(
        (course) => course._id
      );

      next();
    } else if (req.user && req.user.roleUser == "instructor") {
      // opened courses instructor
      const coursesTypeInstructor = { instructorCourse: req.user._id };
      req.user.coursesRegistered = await courseService.getAllCourses(
        coursesTypeInstructor
      );

      // id registered courses instructor
      req.user.idCoursesRegistered = [];

      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// get all favorites
app.use(async (req, res, next) => {
  try {
    if (req.user) {
      // all favorites
      const allFavoritesType = { authorFavorite: req.user._id };
      req.user.allFavorites = await favoriteService.getAllFavorites(
        allFavoritesType
      );

      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(methodOverride("_method"));
app.use(cors());

//Middleware of ejs layouts and ejs
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Middleware of routes
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/instructor", authCheckInstructor, instructorRoutes);
app.use("/student", authCheckStudent, studentRoutes);

// Middleware of home page
app.use("/", homePage);

// route page not found
app.get("*", (req, res) => {
  return res.status(404).render("error", {
    title: "Page introuvable",
    showHeader: false,
    authUser: req.user,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//delete email state unchecked users
userService.deleteEmailUncheckedUsers(cron, path, fs);
