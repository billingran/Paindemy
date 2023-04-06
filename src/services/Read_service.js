const DbService = require("../services/Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");

class ReadService extends DbService {
  constructor() {
    super();
  }

  // Category//////////////////////////////////////////////////
  // get one category
  async getOneCategory(categoryType) {
    const category = await this.Category.find(categoryType);

    return category;
  }

  // get all categories limit
  async getAllCategoriesLimit(limitNumber) {
    const categoriesLimit = await this.Category.find({}).limit(limitNumber);

    let categories = [];

    categoriesLimit.forEach((category) => {
      const categoryEntity = new CategoryEntity(category);
      categories.push(categoryEntity);
    });

    return categories;
  }

  // Course//////////////////////////////////////////////////
  // get all courses
  async getAllCourses(courseType) {
    const allCourses = await this.Course.find(courseType)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    let courses = [];

    allCourses.forEach((course) => {
      const courseEntity = new CourseEntity(course);
      courses.push(courseEntity);
    });

    return courses;
  }

  // get all courses sort, limit
  async getAllCoursesSortLimit(courseType, sortNumber, limitNumber) {
    const coursesSortLimit = await this.Course.find(courseType)
      .sort({ _id: sortNumber })
      .limit(limitNumber)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    let courses = [];

    coursesSortLimit.forEach((course) => {
      const courseEntity = new CourseEntity(course);
      courses.push(courseEntity);
    });

    return courses;
  }

  //   async getAllCourses() {
  //     const courses = await this.model.find();
  //     return courses;
  //   }

  //   async createCourse(data) {
  //     const course = new this.model(data);
  //     await course.save();
  //     return course;
  //   }

  //   async updateCourse(id, data) {
  //     const course = await this.model.findByIdAndUpdate(id, data, { new: true });
  //     return course;
  //   }

  //   async deleteCourse(id) {
  //     const result = await this.model.findByIdAndDelete(id);
  //     return result;
  //   }
}

module.exports = ReadService;
