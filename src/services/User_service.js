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

  // validation sign up
  async signUpValidation(
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
          message: "Prénom, Première lettre en majuscule.",
        };
      }
      newDataStudentProfile.firstnameUser = firstnameUser;
    } else {
      return {
        success: false,
        message: "Prénom, cette case ne doit pas être vide.",
      };
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Nom de famille, Première lettre en majuscule.",
        };
      }
      newDataStudentProfile.lastnameUser = lastnameUser;
    } else {
      return {
        success: false,
        message: "Nom de famille, cette case ne doit pas être vide.",
      };
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return {
          success: false,
          message: "Adresse mail, L’adresse mail n’est pas valide.",
        };
      }

      // validate email exist
      const emailFound = await this.User.findOne({ emailUser }).exec();

      if (emailFound) {
        return {
          success: false,
          message: "Adresse mail, Un compte existe déjà avec cet email.",
        };
      }

      newDataStudentProfile.emailUser = emailUser;
    } else {
      return {
        success: false,
        message: "Adresse mail, cette case ne doit pas être vide.",
      };
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message:
            "Mot de passe, Le mot de passe et la confirmation mot de passe ne sont pas les même.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Mot de passe, Au moins 8 lettres ou chiffres.",
        };
      }
      const hashValue = await bcrypt.hash(passwordUser, 12);
      passwordUser = hashValue;
      newDataStudentProfile.passwordUser = passwordUser;
    } else {
      return {
        success: false,
        message:
          "Mot de passe et La confirmation mot de passe, Ces cases ne doivent pas être vides.",
      };
    }

    newDataStudentProfile.roleUser = "student";
    return { success: true, newDataStudentProfile };
  }

  // post sign up
  async setSignUp(
    firstnameUser,
    lastnameUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    validator,
    req,
    res,
    bcrypt,
    nodeMailer,
    juice,
    jwt,
    fs,
    path,
    ejs
  ) {
    // validation sign up
    const validationResultSignUp = await this.signUpValidation(
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

    // creat payload sign up
    const payloadSignUp = validationResultSignUp.newDataStudentProfile;

    // creat jwt token sign up
    const tokenSignUp = jwt.sign(payloadSignUp, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    // send confirmation email sign up
    super.sendConfirmationEmailMailer(
      nodeMailer,
      juice,
      payloadSignUp,
      tokenSignUp,
      validationResultSignUp.newDataStudentProfile.roleUser,
      fs,
      path,
      ejs
    );

    res.redirect(
      `/auth/confirmemail?token=${tokenSignUp}&role=${validationResultSignUp.newDataStudentProfile.roleUser}`
    );
  }

  // validation join us
  async joinUsValidation(
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
          message: "Prénom, Première lettre en majuscule.",
        };
      }
      newDataInstructorProfile.firstnameUser = firstnameUser;
    } else {
      return {
        success: false,
        message: "Prénom, cette case ne doit pas être vide.",
      };
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Nom de famille, Première lettre en majuscule.",
        };
      }
      newDataInstructorProfile.lastnameUser = lastnameUser;
    } else {
      return {
        success: false,
        message: "Nom de famille, cette case ne doit pas être vide.",
      };
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
          message: "Devise, Première lettre en majuscule.",
        };
      }
      if (fathUser.length > 50) {
        return {
          success: false,
          message: "Devise, Pas plus de 50 caractères, espaces inclus.",
        };
      }
      newDataInstructorProfile.fathUser = fathUser;
    } else {
      return {
        success: false,
        message: "Devise, cette case ne doit pas être vide.",
      };
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return {
          success: false,
          message: "Adresse mail, L’adresse mail n’est pas valide.",
        };
      }

      // validate email exist
      const emailFound = await this.User.findOne({ emailUser }).exec();

      if (emailFound) {
        return {
          success: false,
          message: "Adresse mail, Un compte existe déjà avec cet email.",
        };
      }

      newDataInstructorProfile.emailUser = emailUser;
    } else {
      return {
        success: false,
        message: "Adresse mail, cette case ne doit pas être vide.",
      };
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message:
            "Mot de passe, Le mot de passe et la confirmation mot de passe ne sont pas les même.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Mot de passe, Au moins 8 lettres ou chiffres.",
        };
      }

      const hashValue = await bcrypt.hash(passwordUser, 12);
      passwordUser = hashValue;
      newDataInstructorProfile.passwordUser = passwordUser;
    } else {
      return {
        success: false,
        message:
          "Mot de passe et La confirmation mot de passe, Ces cases ne doivent pas être vides.",
      };
    }

    //validate introduction
    if (introductionUser) {
      if (introductionUser[0] !== introductionUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Introduction, Première lettre en majuscule.",
        };
      }

      newDataInstructorProfile.introductionUser = introductionUser;
    } else {
      return {
        success: false,
        message: "Introduction, cette case ne doit pas être vide.",
      };
    }

    // validate img uploaded
    if (objectImagesFile && arrayImagesFile) {
      let imagesUser = [];

      if (!Array.isArray(objectImagesFile.imageUser)) {
        imagesUser.push(objectImagesFile.imageUser);
      } else {
        objectImagesFile.imageUser.forEach((image) => {
          imagesUser.push(image);
        });
      }

      if (imagesUser.length != 2) {
        return {
          success: false,
          message: "Image, deux images nécessaires.",
        };
      }

      // img upload
      const instructorImageName = emailUser.replace("@", "").replace(".", "");

      newDataInstructorProfile.imageUser = await super.uploadImgs(
        imagesUser,
        instructorImageName,
        path
      );
    } else {
      return {
        success: false,
        message: "Image, cette case ne doit pas être vide.",
      };
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
    bcrypt,
    nodeMailer,
    juice,
    jwt,
    fs,
    path,
    ejs
  ) {
    // validation join us

    // params img uploaded join us
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageUser);
    }

    const validationResultJoinUs = await this.joinUsValidation(
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

    // creat payload join us
    const payloadJoinUs = validationResultJoinUs.newDataInstructorProfile;

    // creat jwt token join us
    const tokenJoinUs = jwt.sign(payloadJoinUs, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    // send confirmation email join us
    super.sendConfirmationEmailMailer(
      nodeMailer,
      juice,
      payloadJoinUs,
      tokenJoinUs,
      validationResultJoinUs.newDataInstructorProfile.roleUser,
      fs,
      path,
      ejs
    );

    res.redirect(
      `/auth/confirmemail?token=${tokenJoinUs}&role=${validationResultJoinUs.newDataInstructorProfile.roleUser}`
    );
  }

  // post confirm email
  async setConfirmEmail(
    token,
    role,
    req,
    res,
    nodeMailer,
    juice,
    jwt,
    fs,
    path,
    ejs
  ) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      // validation of the token
      if (err) {
        if (role == "instructor") {
          req.flash(
            "error_msg",
            "Incrisption échouée : Le lien n'est plus valid."
          );
          return res.redirect("/auth/joinus");
        } else {
          req.flash(
            "error_msg",
            "Incrisption échouée : Le lien n'est plus valid."
          );
          return res.redirect("/auth/signup");
        }
      }

      // resend token
      delete decodedToken.iat;
      delete decodedToken.exp;

      // creat payload
      const payload = decodedToken;

      // creat jwt token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });

      // send confirmation email
      super.sendConfirmationEmailMailer(
        nodeMailer,
        juice,
        payload,
        token,
        role,
        fs,
        path,
        ejs
      );

      req.flash("success_msg", "Le lien a été renvoyé avec succès");
      res.redirect(`/auth/confirmemail?token=${token}&role=${role}`);
    });
  }

  // confirmed email
  async setConfirmedEmail(token, role, jwt, req, res) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      // validation of the token
      if (err) {
        if (role == "instructor") {
          req.flash(
            "error_msg",
            "Incrisption échouée : Le lien n'est plus valid."
          );
          return res.redirect("/auth/joinus");
        } else {
          req.flash(
            "error_msg",
            "Incrisption échouée : Le lien n'est plus valid."
          );
          return res.redirect("/auth/signup");
        }
      }

      // validate email exist
      const emailFound = await this.User.findOne({
        emailUser: decodedToken.emailUser,
      }).exec();

      if (emailFound) {
        if (role == "instructor") {
          req.flash(
            "error_msg",
            "Incrisption échouée : Un compte existe déjà avec cet email."
          );
          return res.redirect("/auth/joinus");
        } else {
          req.flash(
            "error_msg",
            "Incrisption échouée : Un compte existe déjà avec cet email."
          );
          return res.redirect("/auth/signup");
        }
      }

      // save user
      delete decodedToken.iat;
      delete decodedToken.exp;

      let User = new this.User(decodedToken);

      await User.save();

      if (role == "instructor") {
        req.flash(
          "success_msg",
          "Félicitations, vous êtes désormais un Intructeur."
        );
        res.redirect("/auth/login");
      } else {
        req.flash(
          "success_msg",
          "Félicitations, vous êtes désormais un élève."
        );
        res.redirect("/auth/login");
      }
    });
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
      // validate email exist
      const emailFound = await this.User.findOne({
        emailUser: profile.emails[0].value,
      }).exec();

      if (emailFound) {
        done(null, false);
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
    validator,
    bcrypt
  ) {
    let newDataStudentProfile = {};

    //validate firstname
    if (firstnameUser) {
      if (firstnameUser[0] !== firstnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Prénom, Première lettre en majuscule.",
        };
      }
      newDataStudentProfile.firstnameUser = firstnameUser;
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Nom de famille, Première lettre en majuscule.",
        };
      }
      newDataStudentProfile.lastnameUser = lastnameUser;
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return {
          success: false,
          message: "Adresse mail, L’adresse mail n’est pas valide.",
        };
      }

      // validate email if the same
      const emailFound = await this.User.findOne({ emailUser }).exec();

      if (emailFound && emailFound.emailUser == emailUser) {
        return {
          success: false,
          message:
            "Adresse mail, L’adresse mail doit être différente de la précédente.",
        };
      }

      newDataStudentProfile.emailUser = emailUser;
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message:
            "Mot de passe, Le mot de passe et la confirmation mot de passe ne sont pas les même.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Mot de passe, Au moins 8 lettres ou chiffres.",
        };
      }
      const hashValue = await bcrypt.hash(passwordUser, 12);
      passwordUser = hashValue;
      newDataStudentProfile.passwordUser = passwordUser;
    }

    return { success: true, newDataStudentProfile };
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

    req.flash("success_msg", "Mis à jour avec succès.");
    res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
  }

  // validation instructor profile
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
          message: "Prénom, Première lettre en majuscule.",
        };
      }
      newDataInstructorProfile.firstnameUser = firstnameUser;
    }

    //validate lastname
    if (lastnameUser) {
      if (lastnameUser[0] !== lastnameUser[0].toUpperCase()) {
        return {
          success: false,
          message: "Nom de famille, Première lettre en majuscule.",
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
          message: "Devise, Première lettre en majuscule.",
        };
      }
      if (fathUser.length > 50) {
        return {
          success: false,
          message: "Devise, Pas plus de 50 caractères, espaces inclus.",
        };
      }
      newDataInstructorProfile.fathUser = fathUser;
    }

    // validate email
    if (emailUser) {
      if (!validator.isEmail(emailUser)) {
        return {
          success: false,
          message: "Adresse mail, L’adresse mail n’est pas valide.",
        };
      }

      // validate email if the same
      const emailFound = await this.User.findOne({ emailUser }).exec();

      if (emailFound && emailFound.emailUser == emailUser) {
        return {
          success: false,
          message:
            "Adresse mail, L’adresse mail doit être différente de la précédente.",
        };
      }

      newDataInstructorProfile.emailUser = emailUser;
    }

    // validate password
    if (passwordUser && confirmPasswordUser) {
      if (passwordUser !== confirmPasswordUser) {
        return {
          success: false,
          message:
            "Mot de passe, Le mot de passe et la confirmation mot de passe ne sont pas les même.",
        };
      } else if (passwordUser.trim().length < 8) {
        return {
          success: false,
          message: "Mot de passe, Au moins 8 lettres ou chiffres.",
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
          message: "Introduction, Première lettre en majuscule.",
        };
      }

      newDataInstructorProfile.introductionUser = introductionUser;
    }

    // validate img uploaded
    if (objectImagesFile && arrayImagesFile) {
      let imagesUser = [];

      if (!Array.isArray(objectImagesFile.imageUser)) {
        imagesUser.push(objectImagesFile.imageUser);
      } else {
        objectImagesFile.imageUser.forEach((image) => {
          imagesUser.push(image);
        });
      }

      if (imagesUser.length != 2) {
        return {
          success: false,
          message: "Image, deux images nécessaires.",
        };
      }

      // img upload
      const instructorImageName = emailUser.replace("@", "").replace(".", "");

      newDataInstructorProfile.imageUser = await super.uploadImgs(
        imagesUser,
        instructorImageName,
        path
      );
    }

    newDataInstructorProfile.roleUser = "instructor";
    return { success: true, newDataInstructorProfile };
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

      if (
        Array.isArray(objectImagesFile.imageUser) &&
        objectImagesFile.imageUser.length == 2
      ) {
        // delete instructor imgs
        const userTypeDeleteImage = { _id: req.user._id };
        const userDeleteImage = await this.getOneUser(userTypeDeleteImage);

        let userImageName = userDeleteImage.imageUser[0].split("-")[1];

        await super.deleteImgs(userImageName, path, fs);
      }
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

    req.flash("success_msg", "Mis à jour avec succès.");
    res.redirect(`/${req.user.roleUser}/profile/${req.user._id}`);
  }

  // DELETE //////////////////////////////////////////////////
  //post instrutor delete
  async deleteInstructor(_id, req, res, path, fs) {
    // delete instructor and courses, favorites imgs
    const instructorImageName = req.user.emailUser
      .replace("@", "")
      .replace(".", "");

    const coursesAndFavoritesImageName = req.user._id;

    await super.deleteBothImgs(
      instructorImageName,
      coursesAndFavoritesImageName,
      path,
      fs
    );

    // delete instructor favorites
    await this.Favorite.deleteMany({ authorFavorite: req.user._id });

    // delete instructor courses
    await this.Course.deleteMany({ instructorCourse: _id });

    // delete instructor
    await this.User.deleteOne({ _id });

    // delete instructor session
    req.session.destroy();

    res.redirect("/");
  }

  //post student delete
  async deleteStudent(_id, req, res, path, fs) {
    // delete student and favorites imgs
    const studentImageName = req.user.emailUser
      .replace("@", "")
      .replace(".", "");

    const coursesAndFavoritesImageName = req.user._id;

    await super.deleteBothImgs(
      studentImageName,
      coursesAndFavoritesImageName,
      path,
      fs
    );

    // delete student from courses
    await this.Course.updateMany(
      { studentsCourse: _id },
      { $pull: { studentsCourse: _id } }
    ).exec();

    // delete student favorites
    await this.Favorite.deleteMany({ authorFavorite: req.user._id });

    // delete student
    await this.User.deleteOne({ _id });

    // delete student session
    req.session.destroy();

    res.redirect("/");
  }

  // Axios //////////////////////////////////////////////////
  // post delete one student
  async deleteOneStudent(student_id, course_id, req, res) {
    if (req.user && req.user.roleUser == "instructor") {
      // delete user student from the course and get new number students of the course
      let courseDeleteOneStudent = await this.Course.findOneAndUpdate(
        { _id: course_id },
        { $pull: { studentsCourse: student_id } },
        {
          runValidators: true,
          new: true,
        }
      ).exec();

      // send new number students of the course
      return res.send(courseDeleteOneStudent);
    } else {
      // error not a instructor
      req.flash(
        "error_msg",
        "suppression échouée : Vous n’avez pas le droit de supprimer les élèves du cours."
      );

      let courseDeleteOneStudent = { message: "error not a instructor." };
      return res.send(courseDeleteOneStudent);
    }
  }

  // post add one student
  async addOneStudent(_id, emailUser, validator, req, res) {
    if (req.user && req.user.roleUser == "instructor") {
      let courseAddOneStudent;

      // validation of the student email
      if (emailUser) {
        if (!validator.isEmail(emailUser)) {
          // erro of not a valid email
          courseAddOneStudent =
            "Adresse mail, L’adresse mail n’est pas valide.";
          return res.send(courseAddOneStudent);
        }
      }

      // get the student added
      const userTypeStudentAdded = { emailUser };
      const studentAdded = await this.getOneUser(userTypeStudentAdded);

      // validation of the student exist or not
      if (studentAdded._id == null) {
        // erro of student doesn't exist
        courseAddOneStudent = "Adresse mail, L’élève n'existe pas.";
        return res.send(courseAddOneStudent);
      }

      // add user student into the course
      const idStudent = studentAdded._id;

      const courseTypeAddOneStudent = { _id };

      let result = await this.Course.updateOne(
        courseTypeAddOneStudent,
        { $addToSet: { studentsCourse: idStudent } },
        { runValidators: true }
      ).exec();

      // validation of add user student into the course
      if (result.modifiedCount === 0) {
        // erro of adding one student twice
        courseAddOneStudent = "Adresse mail, L’élève existe déjà.";
        return res.send(courseAddOneStudent);
      }

      // get the new number students of the course
      const courseTypeNewNumberMyStudents = { _id };
      let newNumberMyStudents = await this.Course.findOne(
        courseTypeNewNumberMyStudents
      );

      // send new number students of the course and info student
      courseAddOneStudent = { newNumberMyStudents, studentAdded };
      return res.send(courseAddOneStudent);
    } else {
      // error not a instructor
      req.flash(
        "error_msg",
        "ajout échoué : Vous n’avez pas le droit d'ajouter les élèves du cours."
      );

      let courseAddOneStudent = { message: "error not a instructor." };
      return res.send(courseAddOneStudent);
    }
  }
}

module.exports = UserService;
