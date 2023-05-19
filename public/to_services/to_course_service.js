const API_URL = "http://localhost:5000";
const errorAxios = document.querySelectorAll(".errorAxios");

const ctnNumberCourseRegistered = document.querySelector(".ctn_course_number");
const ctnNumberCourseRegisteredSidebar = document.querySelector(
  ".ctn_courseNumber_sidebar"
);

// register one course//////////////////////////////////////////////////
const btnRegisterOneCourse = document.querySelectorAll(
  ".btn_register_OneCourse"
);

async function requestRegisterOneCourse(e) {
  e.preventDefault();

  // hide and remove adding btn
  let ctnRegisterCourse = e.target.parentElement;

  ctnRegisterCourse.addEventListener("animationend", () => {
    ctnRegisterCourse.remove();
  });

  ctnRegisterCourse.style.animation = "scaleDown 0.3s forwards";

  const _id = e.target.getAttribute("id");

  try {
    const response = await axios.post(`${API_URL}/course/registeronecourse`, {
      _id,
    });

    const numberCourseRegistered = response.data;

    if (Array.isArray(numberCourseRegistered)) {
      // get new number courses of user student
      ctnNumberCourseRegistered.innerHTML = `<div class="new_course_number">${numberCourseRegistered.length}</div>`;
      ctnNumberCourseRegisteredSidebar.innerHTML = `<div class="new_courseNumber_sidebar">${numberCourseRegistered.length}</div>`;
    } else if (typeof numberCourseRegistered == "string") {
      // erro of adding one course twice
      errorAxios.forEach((erro) => {
        erro.innerHTML = `<div class="ctn_msg error_msg">
        <strong>${numberCourseRegistered}</strong>
      </div>`;
      });
    } else if (numberCourseRegistered.message) {
      // erro of not one user
      let redirectUrlRegisterOneCourse = "/auth/login";
      window.location.href = redirectUrlRegisterOneCourse;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnRegisterOneCourse.forEach((btn) => {
  btn.addEventListener("click", requestRegisterOneCourse);
});

// unregister one course//////////////////////////////////////////////////
const btnUnregisterOneCourse = document.querySelectorAll(
  ".btn_unregister_oneCourse"
);

async function requestUnregisterOneCourse(e) {
  e.preventDefault();

  // hide and remove course unregistered template
  let ctnUnregisterCourse =
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement;

  ctnUnregisterCourse.addEventListener("animationend", () => {
    ctnUnregisterCourse.remove();
  });

  ctnUnregisterCourse.style.animation = "scaleDown 0.3s forwards";

  const _id = e.target.getAttribute("id");

  try {
    const response = await axios.post(`${API_URL}/course/unregisteronecourse`, {
      _id,
    });

    const numberCourseUnregistered = response.data;

    if (Array.isArray(numberCourseUnregistered)) {
      // get new number courses of user
      ctnNumberCourseRegistered.innerHTML = `<div class="new_course_number">${numberCourseUnregistered.length}</div>`;
      ctnNumberCourseRegisteredSidebar.innerHTML = `<div class="new_courseNumber_sidebar">${numberCourseUnregistered.length}</div>`;
    } else if (numberCourseUnregistered.message) {
      // erro of not a user
      let redirectUrlUnegisterOneCourse = "/auth/login";
      window.location.href = redirectUrlUnegisterOneCourse;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnUnregisterOneCourse.forEach((btn) => {
  btn.addEventListener("click", requestUnregisterOneCourse);
});
