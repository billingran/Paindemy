class DbService {
  constructor() {
    this.Category = require("../models/Category_model");
    this.Course = require("../models/Course_model");
    this.User = require("../models/User_model");
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

module.exports = DbService;
