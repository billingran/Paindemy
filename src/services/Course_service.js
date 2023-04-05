class CourseService {
  constructor() {
    this.Course = require("../models/course_model");
  }

  // get all courses sort, limit
  async getAllCoursesSortLimit(courseType, sortNumber, limitNumber) {
    const lastLimitPuCourses = await this.Course.find(courseType)
      .sort({ _id: sortNumber })
      .limit(limitNumber)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    return lastLimitPuCourses;
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
