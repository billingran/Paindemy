const DbService = require("./Db_service");
const FavoriteEntity = require("../entities/Favorite_entity");

class FavoriteService extends DbService {
  constructor() {
    super();
  }

  // validation my space
  async favoriteValidation(
    nameFavorite,
    nameIngredients,
    percentageIngredients,
    noteFavorite,
    objectImagesFile,
    arrayImagesFile,
    req,
    path
  ) {
    let newDataFavorite = {};

    //validate name favorite
    if (nameFavorite) {
      if (nameFavorite[0] !== nameFavorite[0].toUpperCase()) {
        return {
          success: false,
          message: "Nom, première lettre en majuscule.",
        };
      }

      newDataFavorite.nameFavorite = nameFavorite;
    } else {
      return {
        success: false,
        message: "Nom, cette case ne doit pas être vide.",
      };
    }

    //validate name ingredients and percentage ingredients
    if (
      nameIngredients &&
      Array.isArray(nameIngredients) &&
      nameIngredients.length > 0 &&
      percentageIngredients &&
      Array.isArray(percentageIngredients) &&
      percentageIngredients.length > 0
    ) {
      if (
        nameIngredients.includes("") ||
        percentageIngredients.includes("") ||
        nameIngredients.length !== percentageIngredients.length
      ) {
        return {
          success: false,
          message:
            "Noms des ingrédients et Dosage des ingrédients, ingrédients ou dosages manquants et inégaux.",
        };
      }

      // turn first letter of name ingredients into uppercase
      nameIngredients.forEach((ingredient, index, ingredientsFavorite) => {
        ingredientsFavorite[index] =
          ingredient.charAt(0).toUpperCase() +
          ingredient.slice(1).toLowerCase();
      });

      // turn nameIngredients and percentageIngredients into one objet
      const ingredientsFavorite = nameIngredients.reduce((acc, curr, index) => {
        acc[curr] = percentageIngredients[index];
        return acc;
      }, {});

      newDataFavorite.ingredientsFavorite = ingredientsFavorite;
    } else {
      return {
        success: false,
        message:
          "Noms des ingrédients et Dosage des ingrédients, Ces cases ne doivent pas être vides.",
      };
    }

    //validate note favorite
    if (noteFavorite) {
      if (noteFavorite[0] !== noteFavorite[0].toUpperCase()) {
        return {
          success: false,
          message: "Notes, première lettre en majuscule.",
        };
      }

      newDataFavorite.noteFavorite = noteFavorite;
    } else {
      return {
        success: false,
        message: "Notes, cette case ne doit pas être vide.",
      };
    }

    return { success: true, newDataFavorite };
  }

  // post my space
  async setMySpace(
    _id,
    nameFavorite,
    nameIngredients,
    percentageIngredients,
    noteFavorite,
    req,
    res,
    path
  ) {
    // validation my space

    // params img uploaded my space
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageFavorite);
    }

    const validationResultMySpace = await this.favoriteValidation(
      nameFavorite,
      nameIngredients,
      percentageIngredients,
      noteFavorite,
      objectImagesFile,
      arrayImagesFile,
      req,
      path
    );

    if (!validationResultMySpace.success) {
      req.flash("error_msg", validationResultMySpace.message);
      return res.redirect(`/instructor/myspace/${_id}`);
    }
  }
}

module.exports = FavoriteService;
