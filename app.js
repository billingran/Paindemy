const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const Category = require("./src/models/category");

//Connect to mongodb alts
require("./src/models/database");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Middleware of routes

// app.get("/", (req, res) => {
//   return res.send("hi");
// });

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
