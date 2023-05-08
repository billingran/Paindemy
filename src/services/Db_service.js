class DbService {
  constructor() {
    this.Category = require("../models/Category_model");
    this.Course = require("../models/Course_model");
    this.User = require("../models/User_model");
    this.Favorite = require("../models/Favorite_model");
  }

  // imgs dealer //////////////////////////////////////////////////
  //upload imgs
  async uploadImgs(objectImagesFile, imageName, path) {
    // img uploaded
    let uploadPath;
    let newImageName = [];

    let imageUploadFile = objectImagesFile;

    imageUploadFile.forEach((img, index) => {
      newImageName.push(
        imageName + "-" + Date.now() + "-" + imageUploadFile[index].name
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
        if (file.includes(ImagesName + "-"))
          if (fileStats.isFile() && file.split("-")[1].startsWith(ImagesName)) {
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

  // email dealer //////////////////////////////////////////////////
  // register one course
  async registerOneCourseMailer(
    nodeMailer,
    juice,
    userStudent,
    courseRegistered,
    fs,
    ejs,
    path
  ) {
    const transporter = await nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    // template path of register one course instructor
    const templatePathRegisterInstructor = path.join(
      "views",
      "template_register_instructor.ejs"
    );

    // Compile and read template of register one course instructor
    const templateRegisterInstructor = fs.readFileSync(
      templatePathRegisterInstructor,
      "utf8"
    );

    const htmlContentRegisterInstructor = ejs.render(
      templateRegisterInstructor,
      {
        userStudent,
        courseRegistered,
      }
    );

    // template path of register one course student
    const templatePathRegisterStudent = path.join(
      "views",
      "template_register_student.ejs"
    );

    // Compile and read template of register one course instructor
    const templateRegisterStudent = fs.readFileSync(
      templatePathRegisterStudent,
      "utf8"
    );

    const htmlContentRegisterStudent = ejs.render(templateRegisterStudent, {
      userStudent,
      courseRegistered,
    });

    const mailOptions = [
      {
        from: process.env.GMAIL_USER,
        to: courseRegistered.instructorCourse.emailUser,
        subject: "Notification d'inscription",
        html: juice(htmlContentRegisterInstructor),
      },
      {
        from: process.env.GMAIL_USER,
        to: userStudent.emailUser,
        subject: "Registration Confirmation",
        html: juice(htmlContentRegisterStudent),
      },
    ];

    try {
      const sendMailPromises = mailOptions.map(
        async (option) => await transporter.sendMail(option)
      );
      await Promise.all(sendMailPromises);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // unregister one course instructor
  async unregisterOneCourseMailerInstructor(
    nodeMailer,
    juice,
    userStudent,
    courseRegistered,
    fs,
    ejs,
    path
  ) {
    const transporter = await nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    // template path of unregister one course instructor
    const templatePathUnregisterInstructor = path.join(
      "views",
      "template_unregister_instructor.ejs"
    );

    // Compile and read template unregister one course instructor
    const templateUnregisterInstructor = fs.readFileSync(
      templatePathUnregisterInstructor,
      "utf8"
    );

    const mailOptions = userStudent.map((student) => {
      const htmlContentUnregisterInstructor = ejs.render(
        templateUnregisterInstructor,
        {
          student,
          courseRegistered,
        }
      );

      return {
        from: process.env.GMAIL_USER,
        to: student.emailUser,
        subject: "Notification de fermeture de cours",
        html: juice(htmlContentUnregisterInstructor),
      };
    });

    try {
      const sendMailPromises = mailOptions.map(
        async (option) => await transporter.sendMail(option)
      );
      await Promise.all(sendMailPromises);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async unregisterOneCourseMailerStudent(
    nodeMailer,
    juice,
    userStudent,
    courseRegistered,
    fs,
    ejs,
    path
  ) {
    const transporter = await nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    // template path of unregister one course student
    const templatePathUnregisterStudent = path.join(
      "views",
      "template_unregister_student.ejs"
    );

    // Compile and read template of unregister one course student
    const templateUnregisterStudent = fs.readFileSync(
      templatePathUnregisterStudent,
      "utf8"
    );

    const htmlContentUnregisterStudent = ejs.render(templateUnregisterStudent, {
      userStudent,
      courseRegistered,
    });

    const mailOptions = [
      {
        from: process.env.GMAIL_USER,
        to: courseRegistered.instructorCourse.emailUser,
        subject: "Notification de désinscription",
        html: juice(htmlContentUnregisterStudent),
      },
    ];

    try {
      const sendMailPromises = mailOptions.map(
        async (option) => await transporter.sendMail(option)
      );
      await Promise.all(sendMailPromises);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // send confirmation email
  async sendConfirmationEmailMailer(user, token) {
    const transporter = await nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    // template path of confirm email
    const templatePathConfirmEmail = path.join(
      "views",
      "template_confirm_email.ejs"
    );

    // Compile and read template of unregister one course student
    const templateConfirmEmail = fs.readFileSync(
      templatePathConfirmEmail,
      "utf8"
    );

    const htmlContentConfirmEmail = ejs.render(templateConfirmEmail, {
      user,
      token,
    });

    const mailOptions = [
      {
        from: process.env.GMAIL_USER,
        to: user.emailUser,
        subject: "Confirmation d’adresse mail",
        html: juice(htmlContentConfirmEmail),
      },
    ];

    try {
      const sendMailPromises = mailOptions.map(
        async (option) => await transporter.sendMail(option)
      );
      await Promise.all(sendMailPromises);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = DbService;
