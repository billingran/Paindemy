class CategoryEntity {
  constructor(category) {
    this._id = null;
    this.nameCategory = "";
    this.imageCategory = "";
    this.iconCategory = "";

    for (let prop in category) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = category[prop];
      }
    }
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getNameCategory() {
    this.nameCategory.replace(/-/g, " ");

    return `${this.nameCategory.charAt(0).toUpperCase()}${this.nameCategory
      .slice(1)
      .toLowerCase()}`;
  }

  setNameCategory(nameCategory) {
    this.nameCategory = nameCategory;
  }

  getImageCategory() {
    return this.imageCategory;
  }

  setImageCategory(imageCategory) {
    this.imageCategory = imageCategory;
  }

  getIconCategory() {
    return this.iconCategory;
  }

  setIconCategory(iconCategory) {
    this.iconCategory = iconCategory;
  }
}

module.exports = CategoryEntity;
