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
  async uploadImgs(objectImagesFile, imageName, path) {
    // img uploaded
    let uploadPath;
    let newImageName = [];

    let imageUploadFile = objectImagesFile;

    imageUploadFile.forEach((img, index) => {
      newImageName.push(
        imageName + "-" + Date.now() + imageUploadFile[index].name
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

  // email dealer //////////////////////////////////////////////////
  async registerOneCourseMailer(
    nodeMailer,
    juice,
    userStudent,
    courseRegistered
  ) {
    const transporter = await nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.GMAIL_USER,
      to: userStudent.emailUser,
      subject: "Registration Confirmation",
      html: juice(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
          <title>Paîndemy Registration Confirmation</title>
      
          <style>
            body {
              font-family: "Poppins", sans-serif;
              font-size: 13.5px;
              line-height: 1.6;
              color: #222222;
              background-color: #fff;
      
              margin: 0;
              padding: 0;
            }
      
            a {
              text-decoration: none;
            }
      
            #container {
              max-width: 600px;
              margin: auto;
              background-color: #dedede;
              padding: 20px;
              border: 1px solid #b3b3b3;
              border-radius: 5px;
            }
            h1 {
              font-size: 32px;
              margin-top: 0;
              color: #222222;
              text-align: center;
            }
      
            p {
              margin: 0 0 20px;
              text-align: justify;
            }
      
            .course {
              background-color: #fff;
      
              padding: 20px;
              border-radius: 5px;
              margin: 20px auto;
            }
      
            .ctn_logo_registerOneCourse {
              width: 93.5%;
              display: flex;
            }
      
            .user_registerOneCourse {
              width: 80%;
            }
      
            .title_user_registerOneCourse {
              display: flex;
              align-items: center;
            }
      
            .logo_registerOneCourse {
              width: 20%;
            }
      
            .course h2 {
              font-size: 22px;
              color: #222222;
              margin: 0 0 0 8px;
      
              display: flex;
              align-items: center;
            }
      
            .course p {
              margin-bottom: 10px;
            }
      
            .course ul li {
              margin-bottom: 5px;
            }
      
            p.copyRight_conclu {
              text-align: center;
              color: var(--C-F3F3F3);
              font-size: 0.65rem;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div id="container">
            <div class="logo_title">
              <h1>Thank you for registering at Paîndemy!</h1>
            </div>
      
            <div class="course ctn_logo_registerOneCourse">
              <div class="user_registerOneCourse">
                <div class="title_user_registerOneCourse">
                  <a
                    data-flickr-embed="true"
                    href="https://www.flickr.com/photos/198144307@N02/52833979342/in/dateposted-public/"
                    title="Screenshot 2023-04-21 at 16-42-39 Unicons icon library Line Monochrome Solid Thin Line(1)"
                    ><img
                      src="https://live.staticflickr.com/65535/52833979342_b0ae725f22_t.jpg"
                      width="45"
                      height="45"
                      alt="Screenshot 2023-04-21 at 16-42-39 Unicons icon library Line Monochrome Solid Thin Line(1)"
                    />
                  </a>
                  <h2>${userStudent.firstnameUser} ${
        userStudent.lastnameUser
      }</h2>
                </div>
      
                <ul>
                  <li><strong>Adresse mail : </strong>${
                    userStudent.emailUser
                  }</li>
                </ul>
              </div>
              <div class="logo_registerOneCourse">
                <a data-flickr-embed="true" href="" title="logo_footer"
                  ><img
                    src="https://live.staticflickr.com/65535/52833961800_d6324ebf89_w.jpg"
                    width="100"
                    height="115"
                    alt="logo_footer"
                /></a>
                <script
                  async
                  src="//embedr.flickr.com/assets/client-code.js"
                  charset="utf-8"
                ></script>
              </div>
            </div>
      
            <p>
              Thank you for choosing Paîndemy! The following is the course information
              for which you have registered, providing you with a better understanding
              of the course content.
            </p>
      
            <div class="course">
              <div class="title_user_registerOneCourse">
                <a
                  data-flickr-embed="true"
                  href="https://www.flickr.com/photos/198144307@N02/52835049120/in/dateposted-public/"
                  title="Screenshot 2023-04-21 at 17-32-08 Unicons icon library Line Monochrome Solid Thin Line(1)"
                  ><img
                    src="https://live.staticflickr.com/65535/52835049120_ed9f00af9d_t.jpg"
                    width="45"
                    height="45"
                    alt="Screenshot 2023-04-21 at 17-32-08 Unicons icon library Line Monochrome Solid Thin Line(1)"
                /></a>
      
                <h2>${courseRegistered.nameCourse}</h2>
              </div>
              <ul>
                <li><strong>Enseignants : </strong>${
                  courseRegistered.instructorCourse.firstnameUser
                } ${courseRegistered.instructorCourse.lastnameUser}</li>
                <li><strong>Adresse mail : </strong>${
                  courseRegistered.instructorCourse.emailUser
                }</li>
                <li><strong>Date : </strong>${courseRegistered.dateCourse}</li>
                <li><strong>Temps : </strong>${courseRegistered.timeCourse}</li>
                <li><strong>Adresse : </strong>${
                  courseRegistered.addressCourse
                }</li>
                <li>
                  <strong>Description : </strong>${
                    courseRegistered.descriptionCourse
                  }
                </li>
                <li><strong>Catégorie : </strong>${
                  courseRegistered.categoryCourse
                }</li>
                <li><strong>Calories : </strong>${
                  courseRegistered.caloriesCourse
                }</li>
                <li><strong>Ingredients :</strong> ${courseRegistered.ingredientsCourse
                  .map((ingredient) => `<span>${ingredient}</span>`)
                  .join(", ")}</li>
              </ul>
            </div>
      
            <p>
              Please remember to mark your calendar for the course date and time, and
              don't hesitate to contact us if you have any questions or concerns.
            </p>
      
            <div class="course">
              <div class="title_user_registerOneCourse">
                <a
                  data-flickr-embed="true"
                  href="https://www.flickr.com/photos/198144307@N02/52834642401/in/dateposted-public/"
                  title="Screenshot 2023-04-21 at 17-33-02 Unicons icon library Line Monochrome Solid Thin Line(1)"
                  ><img
                    src="https://live.staticflickr.com/65535/52834642401_0e405bfa14_t.jpg"
                    width="45"
                    height="45"
                    alt="Screenshot 2023-04-21 at 17-33-02 Unicons icon library Line Monochrome Solid Thin Line(1)"
                /></a>
      
                <h2>Contact</h2>
              </div>
              <ul>
                <li>
                  <strong>Adresse : </strong>8 avenue de Carthage, 13100 Aix
                  en-provence
                </li>
                <li><strong>Numéro : </strong> +33 07 67 25 86 03</li>
                <li><strong>Adresse mail : </strong>billingran@gmail.com</li>
              </ul>
            </div>
      
            <p>
              Paîndemy is a platform that offers a variety of online courses. We are
              committed to providing high-quality teaching resources, so that every
              student can have a pleasant and efficient learning experience. If you
              have any questions or suggestions, please feel free to contact us.
            </p>
      
            <p>Wishing you a happy learning experience!</p>
      
            <p><a href="">The Paîndemy Team</a></p>
      
            <p class="copyRight_conclu">
              Copyright © 2023 Paindemy. All Rights Reserved.
            </p>
          </div>
      
          <!-- user -->
          <script
            async
            src="//embedr.flickr.com/assets/client-code.js"
            charset="utf-8"
          ></script>
          <!-- course -->
          <script
            async
            src="//embedr.flickr.com/assets/client-code.js"
            charset="utf-8"
          ></script>
          <!-- contact -->
          <script
            async
            src="//embedr.flickr.com/assets/client-code.js"
            charset="utf-8"
          ></script>
        </body>
      </html>
      `),
    };

    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = DbService;
