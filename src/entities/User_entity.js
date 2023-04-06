class UserEntity {
  constructor(user) {
    this.id = null;
    this.firstnameUser = "";
    this.lastnameUser = "";
    this.themeColorUser = "";
    this.fathUser = "";
    this.emailUser = "";
    this.passwordUser = "";
    this.introductionUser = "";
    this.googleIDUser = "";
    this.imageUser = [];
    this.roleUser = null;
    this.createdAt = new Date();

    for (let prop in user) {
      if (this.hasOwnProperty(`_${prop}`)) {
        this[`_${prop}`] = user[prop];
      }
    }
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getFirstnameUser() {
    return this.firstnameUser;
  }

  setFirstnameUser(firstnameUser) {
    this.firstnameUser = firstnameUser;
  }

  getLastnameUser() {
    return this.lastnameUser;
  }

  setLastnameUser(lastnameUser) {
    this.lastnameUser = lastnameUser;
  }

  getThemeColorUser() {
    return this.themeColorUser;
  }

  setThemeColorUser(themeColorUser) {
    this.themeColorUser = themeColorUser;
  }

  getFathUser() {
    return this.fathUser;
  }

  setFathUser(fathUser) {
    this.fathUser = fathUser;
  }

  getEmailUser() {
    return this.emailUser;
  }

  setEmailUser(emailUser) {
    this.emailUser = emailUser;
  }

  getPasswordUser() {
    return this.passwordUser;
  }

  setPasswordUser(passwordUser) {
    this.passwordUser = passwordUser;
  }

  getIntroductionUser() {
    return this.introductionUser;
  }

  setIntroductionUser(introductionUser) {
    this.introductionUser = introductionUser;
  }

  getGoogleIDUser() {
    return this.googleIDUser;
  }

  setGoogleIDUser(googleIDUser) {
    this.googleIDUser = googleIDUser;
  }

  getImageUser() {
    return this.imageUser;
  }

  setImageUser(imageUser) {
    this.imageUser = imageUser;
  }

  getRoleUser() {
    return this.roleUser;
  }

  setRoleUser(roleUser) {
    this.roleUser = roleUser;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
}

module.exports = UserEntity;
