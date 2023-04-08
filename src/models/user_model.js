const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstnameUser: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50,
  },
  lastnameUser: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50,
  },
  themeColorUser: {
    type: String,
    minlength: 1,
    maxlength: 50,
    default: "#b3b3b3",
  },
  fathUser: {
    type: String,
    minlength: 1,
    maxlength: 100,
    default: "Bonjour, Je suis",
  },
  emailUser: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  passwordUser: {
    type: String,
    minLength: 8,
    maxLength: 1024,
  },
  introductionUser: {
    type: String,
    minlength: 1,
  },
  googleIDUser: {
    type: String,
  },
  imageUser: {
    type: Array,
  },
  roleUser: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
