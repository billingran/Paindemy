const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  nameCourse: {
    type: String,
    required: true,
    maxlength: 255,
  },
  dateCourse: {
    type: String,
    require: true,
    maxlength: 255,
  },
  timeCourse: {
    type: String,
    require: true,
    maxlength: 255,
  },
  addressCourse: {
    type: String,
    required: true,
    maxlength: 255,
  },
  descriptionCourse: {
    type: String,
    required: true,
  },
  categoryCourse: {
    type: String,
    enum: ["Bakery", "Pastry", "Other"],
    required: true,
  },
  caloriesCourse: {
    type: Number,
    required: true,
  },
  ingredientsCourse: {
    type: Array,
    required: true,
  },
  imageCourse: {
    type: String,
    required: true,
    maxlength: 255,
  },
  instructorCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  studentsCourse: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
