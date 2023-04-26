const DbService = require("./Db_service");
const FavoriteEntity = require("../entities/Favorite_entity");

class FavoriteService extends DbService {
  constructor() {
    super();
  }
}

module.exports = FavoriteService;
