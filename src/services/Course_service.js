const DbService = require("./Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");
const UserEntity = require("../entities/User_entity");

class CourseService extends DbService {
  constructor() {
    super();
  }
}

module.exports = CourseService;
