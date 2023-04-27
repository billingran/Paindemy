const DbService = require("./Db_service");
const FavoriteEntity = require("../entities/Favorite_entity");

class FavoriteService extends DbService {
  constructor() {
    super();
  }

  async setMySpace() {
    // validation my space
  }
}

module.exports = FavoriteService;
