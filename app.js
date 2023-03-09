const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const Category = require("./src/models/category_model");
const User = require("./src/models/user_model");
const Course = require("./src/models/course_model");

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

app.get("/", (req, res) => {
  res.render("index", { title: "Me" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
