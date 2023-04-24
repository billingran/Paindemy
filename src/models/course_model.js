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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  caloriesCourse: {
    type: Number,
    required: true,
  },
  ingredientsCourse: {
    type: [String],
    required: true,
  },
  imageCourse: {
    type: [String],
    required: true,
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

courseSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Course", courseSchema);
