const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  nameFavorite: {
    type: String,
    required: true,
    maxlength: 255,
  },
  ingredientsFavorite: {
    type: {},
    required: true,
  },
  noteFavorite: {
    type: String,
    require: true,
  },
  imageFavorite: {
    type: [String],
    required: true,
  },
  authorFavorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  originFavorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
