const DbService = require("./Db_service");
const UserEntity = require("../entities/User_entity");

class UserService extends DbService {
  constructor() {
    super();
  }
  // READ //////////////////////////////////////////////////
  // User//////////////////////////////////////////////////
  // get all users (instructor)
  async getOneUser(userType) {
    const user = await this.User.findOne(userType).exec();

    return new UserEntity(user);
  }

  // get one user count skip (show randm instructor.)
  async getOneUserCountSkip(usersType) {
    let countUsers = await this.User.find(usersType).countDocuments().exec();
    let numberUsers = Math.floor(Math.random() * countUsers);

    const user = await this.User.findOne(usersType).skip(numberUsers).exec();

    return new UserEntity(user);
  }

  // get all users (all instructors)
  async getAllUsers(usersType) {
    const allUsers = await this.User.find(usersType).exec();

    let users = [];

    allUsers.forEach((user) => {
      const userEntity = new UserEntity(user);
      users.push(userEntity);
    });

    return users;
  }

  // CREATE //////////////////////////////////////////////////
  // Auth//////////////////////////////////////////////////
  // validation sign up
  async signUpValidation(
    firstnameUser,
    lastnameUser,
    emailUser,
    validator,
    passwordUser
  ) {
    //validate firstname
    if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
      return {
        success: false,
        message: "Firstname, first letter should be upperCase.",
      };
    }

    //validate lastname
    if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
      return {
        success: false,
        message: "Lastname, first letter should be upperCase.",
      };
    }

    // validate email
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      return { success: false, message: "Email, account exist." };
    } else if (!validator.isEmail(emailUser)) {
      return { success: false, message: "Email, not a valid email." };
    }

    // validate password
    if (passwordUser.length < 8) {
      return {
        success: false,
        message: "Password, at least 8 letters or numbers.",
      };
    }

    return { success: true };
  }

  async setSignUp(
    firstnameUser,
    lastnameUser,
    emailUser,
    validator,
    passwordUser,
    req,
    res
  ) {
    // validation sign up
    const validationResultSignUp = await this.signUpValidation(
      firstnameUser,
      lastnameUser,
      emailUser,
      validator,
      passwordUser
    );

    if (!validationResultSignUp.success) {
      req.flash("error_msg", validationResultSignUp.message);
      return res.redirect("/auth/signup");
    }

    // save user
    let studentUser = new this.User({
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      roleUser: "student",
    });

    await studentUser.save();

    req.flash("success_msg", "You are a student now.");
    res.redirect("/auth/login");
  }

  // validation join us
  async joinUsValidation(
    firstnameUser,
    lastnameUser,
    emailUser,
    validator,
    passwordUser,
    objectImagesFile,
    arrayImagesFile
  ) {
    //validate firstname
    if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
      return {
        success: false,
        message: "Firstname, first letter should be upperCase.",
      };
    }

    //validate lastname
    if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
      return {
        success: false,
        message: "Lastname, first letter should be upperCase.",
      };
    }

    // validate email
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      return { success: false, message: "Email, account exist." };
    } else if (!validator.isEmail(emailUser)) {
      return { success: false, message: "Email, not a valid email." };
    }

    // validate password
    if (passwordUser.length < 8) {
      return {
        success: false,
        message: "Password, at least 8 letters or numbers.",
      };
    }

    // validate img uploaded
    if (!objectImagesFile || arrayImagesFile.length < 2) {
      return {
        success: false,
        message: "Image upload, two images required.",
      };
    } else if (objectImagesFile && arrayImagesFile.length > 2) {
      return {
        success: false,
        message: "Image upload, only two images required.",
      };
    }

    return { success: true };
  }

  // post join us
  async setJoinUs(
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    validator,
    passwordUser,
    introductionUser,
    req,
    res,
    path
  ) {
    // validation join us
    // img uploaded join us
    let objectImagesFile = req.files;
    let arrayImagesFile = Object.keys(req.files.imageUser);

    const validationResultJoinUs = await this.joinUsValidation(
      firstnameUser,
      lastnameUser,
      emailUser,
      validator,
      passwordUser,
      objectImagesFile,
      arrayImagesFile
    );

    if (!validationResultJoinUs.success) {
      req.flash("error_msg", validationResultJoinUs.message);
      return res.redirect("/auth/joinus");
    }

    // img uploaded

    let uploadPath;
    let newImageName = [];

    let imageUploadFile = req.files.imageUser;

    imageUploadFile.forEach((img, index) => {
      newImageName.push(
        emailUser.replace("@", "").replace(".", "") +
          "-" +
          Date.now() +
          imageUploadFile[index].name
      );
    });

    newImageName.forEach((img, index) => {
      uploadPath = path.resolve("./") + "/public/uploads/" + img;

      imageUploadFile[index].mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    });

    // save user
    let instructorUser = new this.User({
      firstnameUser,
      lastnameUser,
      themeColorUser,
      fathUser,
      emailUser,
      passwordUser,
      introductionUser,
      imageUser: newImageName,
      roleUser: "instructor",
    });

    await instructorUser.save();

    req.flash("success_msg", "You are a instructor now.");
    res.redirect("/auth/login");
  }

  // local login
  async setLocalLogin(username, bcrypt, password, done) {
    let userFound = await this.User.findOne({
      emailUser: username.trim(),
    }).exec();

    if (userFound) {
      let passwordCompared = await bcrypt.compare(
        password.trim(),
        userFound.passwordUser
      );

      if (passwordCompared) {
        // func serializeUser
        done(null, userFound);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  }

  //post local login redirect
  setLocalLoginRedirect(user, res) {
    return res.redirect(`/`);
  }

  //google login
  async setGoogleLogin(profile, userTypeGoogle, done) {
    let userFound = await this.User.findOne(userTypeGoogle).exec();

    if (userFound) {
      // func serializeUser
      // save user on session, sign id of user, and then send it in cookie
      done(null, userFound);
    } else {
      userFound = new this.User({
        firstnameUser: profile.name.givenName,
        lastnameUser: profile.name.familyName || "   ",
        emailUser: profile.emails[0].value,
        googleIDUser: profile.id,
        imageUser: profile.photos[0].value,
        roleUser: "student",
      });

      let userGoogle = await userFound.save();

      // func serializeUser
      // save user on session, sign id of user, and then send it in cookie
      done(null, userGoogle);
    }
  }

  //google login redirect
  setGoogleLoginRedirect(user, res) {
    return res.redirect(`/`);
  }

  // serializeUser
  async serializeUser(passport) {
    passport.serializeUser((user, done) => {
      // func deserializeuser
      //set req.user = user, req.isAuthenticated() = true, req.logout is generated
      done(null, user._id);
    });
  }

  // deserializeUser
  async deserializeUser(passport) {
    passport.deserializeUser(async (_id, done) => {
      let foundUser = await this.User.findOne({ _id }).exec();
      done(null, foundUser);
    });
  }

  // UPDATE //////////////////////////////////////////////////
  // validation student profile
  async studentProfileValidation(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator
  ) {
    let newData = {};

    //validate firstname
    if (firstnameUser) {
      if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Firstname, first letter should be upperCase.",
        };
      }
      newData.firstnameUser = firstnameUser;
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Lastname, first letter should be upperCase.",
        };
      }
      newData.lastnameUser = lastnameUser;
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return { success: false, message: "Email, not a valid email." };
      }
      newData.emailUser = emailUser;
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message: "Password, new password and confirm password doesn't match.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Password, at least 8 letters or numbers.",
        };
      }
      newData.passwordUser = passwordUser;
    }

    return { success: true, newData };
  }

  //patch student profile
  async setStudentProfile(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator,
    req,
    res
  ) {
    // validation student profile

    const validationResultStudentProfile = await this.studentProfileValidation(
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
      validator
    );

    if (!validationResultStudentProfile.success) {
      req.flash("error_msg", validationResultStudentProfile.message);
      return res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
    }

    console.log(validationResultStudentProfile.newData);

    // update user
    let { _id } = req.user;
    const userType = { _id };

    await this.User.findOneAndUpdate(
      userType,
      validationResultStudentProfile.newData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    req.flash("success_msg", "Updated Successfully.");
    res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
  }

  // DELETE //////////////////////////////////////////////////
  //post instrutor delete
  async deleteInstructor(_id, req, res, path, fs) {
    // delete instructor courses
    await this.Course.deleteMany({ instructorCourse: _id });

    // delete instructor
    await this.User.deleteOne({ _id });

    // delete instructor session
    req.session.destroy();

    // delete instructor and courses photoes
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
        const instructorImageName = req.user.emailUser
          .replace("@", "")
          .replace(".", "");

        // get courses images firstname
        const coursessImageName = _id;

        // Check if the stat is a file and file was uploaded by the user
        if (
          (fileStats.isFile() && file.startsWith(instructorImageName)) ||
          file.startsWith(coursessImageName)
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

    res.redirect("/");
  }

  //post student delete
  async deleteStudent(_id, req, res) {
    // delete student from courses
    await this.Course.updateMany(
      { studentsCourse: _id },
      { $pull: { studentsCourse: _id } }
    ).exec();

    // delete student
    await this.User.deleteOne({ _id });

    // delete student session
    req.session.destroy();

    res.redirect("/");
  }
}

module.exports = UserService;
