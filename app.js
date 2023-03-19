// dotenv
const dotenv = require("dotenv").config();
// express
const express = require("express");
const app = express();
// ejs
const expressLayouts = require("express-ejs-layouts");
// models
const Category = require("./src/models/category_model");
const User = require("./src/models/user_model");
const Course = require("./src/models/course_model");
// routes
const authRoutes = require("./src/routes/auth_routes");
const courseRoutes = require("./src/routes/course_routes");
const instructorRoutes = require("./src/routes/instructor_routes");
const studentRoutes = require("./src/routes/student_routes");

//Connect to mongodb alts
require("./src/models/database");

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
app.use("/instructor", instructorRoutes);
app.use("/student", studentRoutes);

// Home Page
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
