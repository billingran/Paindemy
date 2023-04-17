const DbService = require("./Db_service");
const UserEntity = require("../entities/User_entity");

class UserService extends DbService {
  constructor() {
    super();
  }
  // READ //////////////////////////////////////////////////
  // User
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
  // validation sign up and student profile
  async studentProfileValidation(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator,
    bcrypt
  ) {
    let newDataStudentProfile = {};

    //validate firstname
    if (firstnameUser) {
      if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Firstname, first letter should be upperCase.",
        };
      }
      newDataStudentProfile.firstnameUser = firstnameUser;
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Lastname, first letter should be upperCase.",
        };
      }
      newDataStudentProfile.lastnameUser = lastnameUser;
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return { success: false, message: "Email, not a valid email." };
      }
      newDataStudentProfile.emailUser = emailUser;
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message: "Password, password and confirm password doesn't match.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Password, at least 8 letters or numbers.",
        };
      }
      const hashValue = await bcrypt.hash(passwordUser, 12);
      passwordUser = hashValue;
      newDataStudentProfile.passwordUser = passwordUser;
    }

    return { success: true, newDataStudentProfile };
  }

  async setSignUp(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator,
    req,
    res,
    bcrypt
  ) {
    // validate email exist
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Email, account exist.");
      return res.redirect("/auth/signup");
    }

    // validation sign up
    const validationResultSignUp = await this.studentProfileValidation(
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
      validator,
      bcrypt
    );

    if (!validationResultSignUp.success) {
      req.flash("error_msg", validationResultSignUp.message);
      return res.redirect("/auth/signup");
    }

    // // save user
    validationResultSignUp.newDataStudentProfile.roleUser = "student";

    let studentUser = new this.User(
      validationResultSignUp.newDataStudentProfile
    );

    await studentUser.save();

    req.flash("success_msg", "You are a student now.");
    res.redirect("/auth/login");
  }

  // validation join us and instructor profile
  async instructorProfileValidation(
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    introductionUser,
    objectImagesFile,
    arrayImagesFile,
    validator,
    res,
    path,
    bcrypt
  ) {
    let newDataInstructorProfile = {};

    //validate firstname
    if (firstnameUser) {
      if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Firstname, first letter should be upperCase.",
        };
      }
      newDataInstructorProfile.firstnameUser = firstnameUser;
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Lastname, first letter should be upperCase.",
        };
      }
      newDataInstructorProfile.lastnameUser = lastnameUser;
    }

    // validate theme color
    if (themeColorUser) {
      newDataInstructorProfile.themeColorUser = themeColorUser;
    }

    //validate faith
    if (fathUser) {
      if (fathUser[0] !== fathUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Faith, first letter should be upperCase.",
        };
      }
      newDataInstructorProfile.fathUser = fathUser;
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return { success: false, message: "Email, not a valid email." };
      }
      newDataInstructorProfile.emailUser = emailUser;
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message: "Password, password and confirm password doesn't match.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Password, at least 8 letters or numbers.",
        };
      }

      const hashValue = await bcrypt.hash(passwordUser, 12);
      passwordUser = hashValue;
      newDataInstructorProfile.passwordUser = passwordUser;
    }

    //validate introduction
    if (introductionUser) {
      if (introductionUser[0] !== introductionUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Introduction, first letter should be upperCase.",
        };
      }

      newDataInstructorProfile.introductionUser = introductionUser;
    }

    // validate img uploaded
    if (objectImagesFile && arrayImagesFile) {
      if (objectImagesFile.imageUser.length != 2) {
        return {
          success: false,
          message: "Image upload, two images required.",
        };
      }

      // img upload
      const instructorImageName = emailUser.replace("@", "").replace(".", "");

      newDataInstructorProfile.imageUser = await super.uploadImgs(
        objectImagesFile.imageUser,
        instructorImageName,
        path
      );
    }

    newDataInstructorProfile.roleUser = "instructor";
    return { success: true, newDataInstructorProfile };
  }

  // post join us
  async setJoinUs(
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    introductionUser,
    validator,
    req,
    res,
    path,
    bcrypt
  ) {
    // validate email exist
    const emailFound = await this.User.findOne({ emailUser }).exec();
    if (emailFound) {
      req.flash("error_msg", "Email, account exist.");
      return res.redirect("/auth/joinus");
    }

    // validation join us

    // params img uploaded join us
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageUser);
    }

    const validationResultJoinUs = await this.instructorProfileValidation(
      firstnameUser,
      lastnameUser,
      themeColorUser,
      fathUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
      introductionUser,
      objectImagesFile,
      arrayImagesFile,
      validator,
      res,
      path,
      bcrypt
    );

    if (!validationResultJoinUs.success) {
      req.flash("error_msg", validationResultJoinUs.message);
      return res.redirect("/auth/joinus");
    }

    // save user
    let instructorUser = new this.User(
      validationResultJoinUs.newDataInstructorProfile
    );

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

  //patch student profile
  async setStudentProfile(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator,
    req,
    res,
    bcrypt
  ) {
    // validation student profile
    const validationResultStudentProfile = await this.studentProfileValidation(
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
      validator,
      bcrypt
    );

    if (!validationResultStudentProfile.success) {
      req.flash("error_msg", validationResultStudentProfile.message);
      return res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
    }

    // update user
    let { _id } = req.user;
    const userTypeStudentProfile = { _id };

    await this.User.findOneAndUpdate(
      userTypeStudentProfile,
      validationResultStudentProfile.newDataStudentProfile,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    req.flash("success_msg", "Updated Successfully.");
    res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
  }

  //patch instructor profile
  async setInstructorProfile(
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    introductionUser,
    validator,
    req,
    res,
    path,
    fs,
    bcrypt
  ) {
    // validation instructor profile

    // params img uploaded join us
    let objectImagesFile = req.files;
    let arrayImagesFile;

    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageUser);

      // delete instructor imgs
      const instructorImageName = req.user.emailUser
        .replace("@", "")
        .replace(".", "");

      await super.deleteImgs(instructorImageName, path, fs);
    }

    const validationResultInstructorProfile =
      await this.instructorProfileValidation(
        firstnameUser,
        lastnameUser,
        themeColorUser,
        fathUser,
        emailUser,
        passwordUser,
        confirmPasswordUser,
        introductionUser,
        objectImagesFile,
        arrayImagesFile,
        validator,
        res,
        path,
        bcrypt
      );

    if (!validationResultInstructorProfile.success) {
      req.flash("error_msg", validationResultInstructorProfile.message);
      return res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
    }

    // update user instructor
    let { _id } = req.user;
    const userTypeInstructorProfile = { _id };

    await this.User.findOneAndUpdate(
      userTypeInstructorProfile,
      validationResultInstructorProfile.newDataInstructorProfile,
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
    // delete instructor and courses imgs
    const instructorImageName = req.user.emailUser
      .replace("@", "")
      .replace(".", "");

    const courseImageName = req.user._id;

    await super.deleteBothImgs(instructorImageName, courseImageName, path, fs);

    // delete instructor courses
    await this.Course.deleteMany({ instructorCourse: _id });

    // delete instructor
    await this.User.deleteOne({ _id });

    // delete instructor session
    req.session.destroy();

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
