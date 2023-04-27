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

    console.log(nameFavorite);
  }
}

module.exports = FavoriteService;
