const DbService = require("./Db_service");
const FavoriteEntity = require("../entities/Favorite_entity");

class FavoriteService extends DbService {
  constructor() {
    super();
  }
  // READ //////////////////////////////////////////////////
  // get one favorite (one favorite)
  async getOneFavorite(favoriteType) {
    const favorite = await this.Favorite.findOne(favoriteType)
      .populate("authorFavorite", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .populate("categoryFavorite", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
      .exec();

    return new FavoriteEntity(favorite);
  }

  // get one favorite (show random all users favorites,)
  getOneFavoriteFloorMath(favorites) {
    let countFavorites = favorites.length;
    let numberFavorites = Math.floor(Math.random() * countFavorites);

    const favorite = favorites[numberFavorites];

    return favorite;
  }

  // get all courses (all favorites)
  async getAllFavorites(FavoritesType) {
    const allFavorites = await this.Favorite.find(FavoritesType)
      .populate("authorFavorite", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .populate("categoryFavorite", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
      .exec();

    let favorites = [];

    allFavorites.forEach((favorite) => {
      const favoriteEntity = new FavoriteEntity(favorite);
      favorites.push(favoriteEntity);
    });

    return favorites;
  }

  // CREATE //////////////////////////////////////////////////
  // validation my space
  async favoriteValidation(
    _id,
    nameFavorite,
    nameIngredients,
    percentageIngredients,
    noteFavorite,
    categoryFavorite,
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

      if (percentageIngredients.some((dosage) => isNaN(dosage))) {
        return {
          success: false,
          message: "Dosage, dosage doit être un numéro.",
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

    //validate category favorite
    if (categoryFavorite) {
      if (
        categoryFavorite !== "642b25e9e4f201d77621c6bc" &&
        categoryFavorite !== "642b25f3e4f201d77621c6bd" &&
        categoryFavorite !== "642b25fbe4f201d77621c6be"
      ) {
        return {
          success: false,
          message:
            "Catégorie, seulement « Boulangerie », « Pâtisserie » ou « Autre ».",
        };
      }

      newDataFavorite.categoryFavorite = categoryFavorite;
    } else {
      return {
        success: false,
        message: "Catégorie, cette case ne doit pas être vide.",
      };
    }

    //validate image favorite
    if (objectImagesFile && arrayImagesFile) {
      let imagesFavorite = [];

      if (!Array.isArray(objectImagesFile.imageFavorite)) {
        imagesFavorite.push(objectImagesFile.imageFavorite);
      } else {
        objectImagesFile.imageFavorite.forEach((image) => {
          imagesFavorite.push(image);
        });
      }

      if (imagesFavorite.length != 1) {
        return {
          success: false,
          message: "Image, une image nécessaire.",
        };
      }

      //image favorite upload
      const favoriteImageName = req.user._id;

      newDataFavorite.imageFavorite = await super.uploadImgs(
        imagesFavorite,
        favoriteImageName,
        path
      );
    } else {
      return {
        success: false,
        message: "Image, cette case ne doit pas être vide.",
      };
    }

    newDataFavorite.authorFavorite = req.user._id;
    newDataFavorite.originFavorite = _id;
    return { success: true, newDataFavorite };
  }

  // post my space
  async setMySpace(
    _id,
    nameFavorite,
    nameIngredients,
    percentageIngredients,
    noteFavorite,
    categoryFavorite,
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
      _id,
      nameFavorite,
      nameIngredients,
      percentageIngredients,
      noteFavorite,
      categoryFavorite,
      objectImagesFile,
      arrayImagesFile,
      req,
      path
    );

    if (!validationResultMySpace.success) {
      req.flash("error_msg", validationResultMySpace.message);
      return res.redirect(`/${req.user.roleUser}/myspace/${_id}`);
    }

    // save new favorite
    let newFavorite = new this.Favorite(
      validationResultMySpace.newDataFavorite
    );

    await newFavorite.save();

    req.flash(
      "success_msg",
      "Votre recette favorite à été enregistrée avec succès."
    );
    res.redirect(`/${req.user.roleUser}/myspace/${_id}`);
  }

  // Axios //////////////////////////////////////////////////

  // delete one favorite
  async deleteOneFavorite(_id, req, res, path, fs) {
    // check if it's a user
    if (req.user) {
      // delete user's image favorite
      const favoriteTypeDeleteImage = { _id };
      const favoriteDeleteImage = await this.getOneFavorite(
        favoriteTypeDeleteImage
      );

      let favoriteImageName =
        favoriteDeleteImage.imageFavorite[0].split("-")[1];

      await super.deleteImgs(favoriteImageName, path, fs);

      // delete user instructor's favorite
      await this.Favorite.deleteOne({ _id }).exec();

      // get new number favorites of user
      const favoritesTypeNumberFavorites = { authorFavorite: req.user._id };
      let allFavorites = await this.getAllFavorites(
        favoritesTypeNumberFavorites
      );

      // send new number courses of user
      return res.send(allFavorites);
    } else {
      // error not a user
      req.flash(
        "error_msg",
        "Incrisption échouée : Vous n’avez pas le droit de suprimer cette recette."
      );

      let allFavorites = { message: "error not a user." };
      return res.send(allFavorites);
    }
  }
}

module.exports = FavoriteService;
