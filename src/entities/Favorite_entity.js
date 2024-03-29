// time controller
const moment = require("moment");

class FavoriteEntity {
  constructor(favorite) {
    this._id = null;
    this.nameFavorite = "";
    this.ingredientsFavorite = {};
    this.noteFavorite = "";
    this.imageFavorite = [];
    this.authorFavorite = null;
    this.categoryFavorite = null;
    this.createdAt = new Date();

    for (let prop in favorite) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = favorite[prop];
      }
    }
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getNameFavorite() {
    return this.nameFavorite;
  }

  setNameFavorite(nameFavorite) {
    this.nameFavorite = nameFavorite;
  }

  getIngredientsFavorite() {
    return this.ingredientsFavorite;
  }

  setIngredientsFavorite(ingredientsFavorite) {
    this.ingredientsFavorite = ingredientsFavorite;
  }

  getNoteFavorite() {
    return this.noteFavorite;
  }

  setNoteFavorite(noteFavorite) {
    this.noteFavorite = noteFavorite;
  }

  getImageFavorite() {
    return this.imageFavorite;
  }

  setImageFavorite(imageFavorite) {
    this.imageFavorite = imageFavorite;
  }

  getAuthorFavorite() {
    return this.authorFavorite;
  }

  setAuthorFavorite(authorFavorite) {
    this.authorFavorite = authorFavorite;
  }

  getCategoryFavorite() {
    return this.categoryFavorite;
  }

  setCategoryFavorite(categoryFavorite) {
    this.categoryFavorite = categoryFavorite;
  }

  getCreatedAt() {
    return moment(this.createdAt).format("DD/MM/YYYY h:mm:ss a");
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
}

module.exports = FavoriteEntity;
