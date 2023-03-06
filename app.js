const dotenv = require("dotenv").config();
require("./models/database");

app.get("/", (req, res) => {
  return res.render("index", { user: req.user });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
