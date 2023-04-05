class CourseService {
  constructor() {
    this.Course = require("../models/course_model");
  }

  // get all last courses, limit, populate users
  async getAllLastCoursesLimitPU(courseType, limitNumber) {
    const categoriesLimit = await this.Course.find({ courseType })
      .sort({ _id: -1 })
      .limit(limitNumber)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();
    return categoriesLimit;
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

module.exports = new CourseService();
