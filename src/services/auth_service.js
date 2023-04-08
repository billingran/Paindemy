const DbService = require("../services/Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");
const UserEntity = require("../entities/User_entity");

class AuthService extends DbService {
  constructor() {
    super();
  }
}

module.exports = AuthService;
