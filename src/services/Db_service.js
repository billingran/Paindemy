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

  // imgs dealer //////////////////////////////////////////////////
  //upload imgs
  async uploadImgs(objectImagesFile, ImageName, path) {
    // img uploaded
    let uploadPath;
    let newImageName = [];

    let imageUploadFile = objectImagesFile.imageUser;

    imageUploadFile.forEach((img, index) => {
      newImageName.push(
        ImageName + "-" + Date.now() + imageUploadFile[index].name
      );
    });

    newImageName.forEach((img, index) => {
      uploadPath = path.resolve("./") + "/public/uploads/" + img;

      imageUploadFile[index].mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    });

    return newImageName;
  }

  // delete imgs
  async deleteImgs(ImageName, path, fs) {
    // file path
    const directoryPath = path.resolve("./") + "/public/uploads";

    // read the file path
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        // image path
        const filePath = path.join(directoryPath, file);

        // get image stat
        const fileStats = fs.statSync(filePath);

        // get instrutor or course images firstname
        const ImagesName = ImageName;

        // Check if the stat is a file and file was uploaded by the user
        if (fileStats.isFile() && file.startsWith(ImagesName)) {
          // Delete the file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err}`);
            }
          });
        }
      });
    });
  }

  // delete both imgs
  async deleteBothImgs(instructorImageName, courseImageName, path, fs) {
    // file path
    const directoryPath = path.resolve("./") + "/public/uploads";

    // read the file path
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        // image path
        const filePath = path.join(directoryPath, file);

        // get image stat
        const fileStats = fs.statSync(filePath);

        // get instrutor images firstname
        const instructorImagesName = instructorImageName;

        // get courses images firstname
        const courseImagesName = courseImageName;

        // Check if the stat is a file and file was uploaded by the user
        if (
          (fileStats.isFile() && file.startsWith(instructorImagesName)) ||
          file.startsWith(courseImagesName)
        ) {
          // Delete the file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err}`);
            }
          });
        }
      });
    });
  }
}

module.exports = DbService;
