class CourseEntity {
  constructor(course) {
    this.id = null;
    this.nameCourse = "";
    this.dateCourse = "";
    this.timeCourse = "";
    this.addressCourse = "";
    this.descriptionCourse = "";
    this.categoryCourse = "";
    this.caloriesCourse = 0;
    this.ingredientsCourse = [];
    this.imageCourse = [];
    this.instructorCourse = null;
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
    return this.nameCourse;
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
    return this.descriptionCourse;
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

  getCreatedAt() {
    return this.createdAt;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
}

module.exports = CourseEntity;
