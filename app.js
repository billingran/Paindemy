// dotenv
const dotenv = require("dotenv").config();

// express
const express = require("express");
const app = express();

//session
const session = require("express-session");

//flash message
const flash = require("connect-flash");

//passport auth
const passport = require("passport");

// functions
const myFunctions = require("./lib/functions");

// ejs
const expressLayouts = require("express-ejs-layouts");

// models
const Category = require("./src/models/Category_model");
const User = require("./src/models/User_model");
const Course = require("./src/models/Course_model");

// routes
const authRoutes = require("./src/routes/auth_routes");
require("./src/config/passport");
const courseRoutes = require("./src/routes/course_routes");
const instructorRoutes = require("./src/routes/instructor_routes");
const studentRoutes = require("./src/routes/student_routes");
const homePage = require("./src/routes/home_routes");

//Connect to mongodb alts
require("./src/models/database");

// auth check
const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};

// Middleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware functions customized and flash message
app.use(flash());
app.use((req, res, next) => {
  // funcs
  res.locals.urlParsed = myFunctions.urlParsed;
  res.locals.getBackUrl = myFunctions.getBackUrl;

  // flash message
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware of ejs layouts and ejs
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Middleware of routes
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/instructor", authCheck, instructorRoutes);
app.use("/student", authCheck, studentRoutes);

// Middleware of home page
app.use("/", homePage);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
