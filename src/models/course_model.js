const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  nameCourse: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  dateCourse: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255,
  },
  timeCourse: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255,
  },
  addressCourse: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  descriptionCourse: {
    type: String,
    required: true,
    minlength: 1,
  },
  categoryCourse: {
    type: String,
    enum: ["Bakery", "Pastry", "Other"],
    required: true,
  },
  caloriesCourse: {
    type: Number,
    required: true,
    minlength: 1,
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
