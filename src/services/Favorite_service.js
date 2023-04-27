const DbService = require("./Db_service");
const FavoriteEntity = require("../entities/Favorite_entity");

class FavoriteService extends DbService {
  constructor() {
    super();
  }

  async setMySpace(
    nameFavorite,
    nameIngredients,
    percentageIngredients,
    noteFavorite,
    req,
    res,
    path
  ) {
    // validation my space

    // params img uploaded new class
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageCourse);
    }
  }
}

module.exports = FavoriteService;
