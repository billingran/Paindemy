const DbService = require("../services/Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");

class ReadService extends DbService {
  constructor() {
    super();
  }

  // Category//////////////////////////////////////////////////
  // get one category (icon Category,)
  async getOneCategory(categoryType) {
    const category = await this.Category.findOne(categoryType);

    return new CategoryEntity(category);
  }

  // get all categories limit (categories)
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
  // get one course (one course)
  async getOneCourse(courseType) {
    const course = await this.Course.findOne(courseType)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    return new CourseEntity(course);
  }

  // get one course count skip (random, show random one, show random all)
  async getOneCourseCountSkip(coursesType) {
    let countCourses = await this.Course.find(coursesType).countDocuments();
    let numberCourses = Math.floor(Math.random() * countCourses);

    const course = await this.Course.findOne(coursesType)
      .skip(numberCourses)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    return new CourseEntity(course);
  }

  // get all courses (all courses, courses category)
  async getAllCourses(coursesType) {
    const allCourses = await this.Course.find(coursesType)
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

  // get all courses sort, limit (courses template, latest course, relates courses)
  async getAllCoursesSortLimit(coursesType, sortNumber, limitNumber) {
    const coursesSortLimit = await this.Course.find(coursesType)
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
