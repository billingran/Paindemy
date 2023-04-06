class DbService {
  constructor() {
    this.Category = require("../models/Category_model");
    this.Course = require("../models/Course_model");
  }
}

module.exports = DbService;
