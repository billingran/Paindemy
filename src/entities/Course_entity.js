// time controller
const moment = require("moment");

class CourseEntity {
  constructor(course) {
    this._id = null;
    this.nameCourse = "";
    this.dateCourse = "";
    this.timeCourse = "";
    this.addressCourse = "";
    this.descriptionCourse = "";
    this.categoryCourse = null;
    this.caloriesCourse = 0;
    this.ingredientsCourse = [];
    this.imageCourse = [];
    this.instructorCourse = null;
    this.studentsCourse = [];
    this.createdAt = new Date();

    for (let prop in course) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = course[prop];
      }
    }
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getNameCourse() {
    this.nameCourse.replace(/-/g, " ");

    return `${this.nameCourse.charAt(0).toUpperCase()}${this.nameCourse
      .slice(1)
      .toLowerCase()}`;
  }

  setNameCourse(nameCourse) {
    this.nameCourse = nameCourse;
  }

  getDateCourse() {
    return this.dateCourse;
  }

  setDateCourse(dateCourse) {
    this.dateCourse = dateCourse;
  }

  getTimeCourse() {
    return this.timeCourse;
  }

  setTimeCourse(timeCourse) {
    this.timeCourse = timeCourse;
  }

  getAddressCourse() {
    return this.addressCourse;
  }

  setAddressCourse(addressCourse) {
    this.addressCourse = addressCourse;
  }

  getDescriptionCourse() {
    this.descriptionCourse.replace(/-/g, " ");

    return `${this.descriptionCourse
      .charAt(0)
      .toUpperCase()}${this.descriptionCourse.slice(1).toLowerCase()}`;
  }

  setDescriptionCourse(descriptionCourse) {
    this.descriptionCourse = descriptionCourse;
  }

  getCategoryCourse() {
    return this.categoryCourse;
  }

  setCategoryCourse(categoryCourse) {
    this.categoryCourse = categoryCourse;
  }

  getCaloriesCourse() {
    return this.caloriesCourse;
  }

  setCaloriesCourse(caloriesCourse) {
    this.caloriesCourse = caloriesCourse;
  }

  getIngredientsCourse() {
    return this.ingredientsCourse;
  }

  setIngredientsCourse(ingredientsCourse) {
    this.ingredientsCourse = ingredientsCourse;
  }

  getImageCourse() {
    return this.imageCourse;
  }

  setImageCourse(imageCourse) {
    this.imageCourse = imageCourse;
  }

  getInstructorCourse() {
    return this.instructorCourse;
  }

  setInstructorCourse(instructorCourse) {
    this.instructorCourse = instructorCourse;
  }

  getStudentsCourse() {
    return this.studentsCourse;
  }

  setStudentsCourse(studentsCourse) {
    this.studentsCourse = studentsCourse;
  }

  getCreatedAt() {
    return moment(this.createdAt).format("DD/MM/YYYY h:mm:ss a");
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }

  // url parser //////////////////////////////////////////////////
  // url parsed to toLowerCase
  urlParsed(url) {
    const urlParsed = url.toLowerCase().replace(/\s+/g, "-");

    return urlParsed;
  }

  // url parsed to toUpperCase
  getBackUrl(urlParsed) {
    let url = urlParsed.replace(/-/g, " ");

    return `${url.charAt(0).toUpperCase()}${url.slice(1).toLowerCase()}`;
  }
}

module.exports = CourseEntity;
