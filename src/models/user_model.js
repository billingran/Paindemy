const mongoose = require("mongoose");

// bcrypt
const bcrypt = require("bcrypt");

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
  favoriteUser: {
    type: [{}],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// mongoose middleware
// bcrypt password for new user or modified password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("passwordUser")) {
    const hashValue = await bcrypt.hash(this.passwordUser, 12);
    this.passwordUser = hashValue;
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const { passwordUser: plainPassword } = this._update;
  if (plainPassword) {
    const hashValue = await bcrypt.hash(plainPassword, 12);
    this._update.passwordUser = hashValue;
  }

  console.log(this._update);
  next();
});

module.exports = mongoose.model("User", userSchema);
