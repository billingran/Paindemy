const mongoose = require("mongoose");

// mongoose.models = {};
// mongoose.modelSchemas = {};

const categorySchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    required: true,
    maxlength: 255,
  },
  imageCategory: {
    type: String,
    required: true,
    maxlength: 255,
  },
  iconCategory: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

module.exports = mongoose.model("Category", categorySchema);
