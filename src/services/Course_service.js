class CourseService {
  constructor() {
    this.Course = require("../models/Course_model");
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
