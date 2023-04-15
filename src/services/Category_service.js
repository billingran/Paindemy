const DbService = require("./Db_service");
const CategoryEntity = require("../entities/Category_entity");

class CategoryService extends DbService {
  constructor() {
    super();
  }
  // Category//////////////////////////////////////////////////
  // get one category (icon Category,)
  async getOneCategory(categoryType) {
    const category = await this.Category.findOne(categoryType).exec();

    return new CategoryEntity(category);
  }

  // get all categories
  async getAllCategories(categoriesType) {
    const allCategories = await this.Category.find(categoriesType).exec();

    let categories = [];

    allCategories.forEach((category) => {
      const categoryEntity = new CategoryEntity(category);
      categories.push(categoryEntity);
    });

    return categories;
  }

  // get all categories limit (categories)
  async getAllCategoriesLimit(limitNumber) {
    const categoriesLimit = await this.Category.find({})
      .limit(limitNumber)
      .exec();

    let categories = [];

    categoriesLimit.forEach((category) => {
      const categoryEntity = new CategoryEntity(category);
      categories.push(categoryEntity);
    });

    return categories;
  }
}

module.exports = CategoryService;
