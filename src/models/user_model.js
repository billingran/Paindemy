const mongoose = require("mongoose");

// mongoose.models = {};
// mongoose.modelSchemas = {};

const userSchema = new mongoose.Schema({
  firstnameUser: {
    type: String,
    require: true,
    maxlength: 255,
  },
  lastnameUser: {
    type: String,
    require: true,
    maxlength: 255,
  },
  themeColorUser: {
    type: String,
    maxlength: 255,
    default: "#b3b3b3",
  },
  fathUser: {
    type: String,
    maxlength: 50,
    default: "Bonjour, Je suis",
  },
  emailUser: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  passwordUser: {
    type: String,
    minlength: 8,
    maxLength: 255,
  },
  introductionUser: {
    type: String,
    minlength: 1,
  },
  googleIDUser: {
    type: String,
  },
  imageUser: {
    type: [String],
  },
  roleUser: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  emailStateUser: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
