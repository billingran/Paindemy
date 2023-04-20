const API_URL = "http://localhost:5000";

// register a course//////////////////////////////////////////////////
const btnRegisterOneCourse = document.querySelectorAll(
  ".btn_register_OneCourse"
);
const ctnNumberCourseRegistered = document.querySelector(".ctn_course_number");
const ctnNumberCourseRegisteredSidebar = document.querySelector(
  ".ctn_courseNumber_sidebar"
);
const errorAxios = document.querySelectorAll(".errorAxios");

function requestRgisterOneCourse(event) {
  event.preventDefault();

  const _id = event.target.getAttribute("id");

  axios
    .post(`${API_URL}/course/registeronecourse`, { _id })
    .then((response) => {
      const numberCourseRegistered = response.data;

      if (Array.isArray(numberCourseRegistered)) {
        // get new number courses of user
        ctnNumberCourseRegistered.innerHTML = `<div class="new_course_number">${numberCourseRegistered.length}</div>`;
        ctnNumberCourseRegisteredSidebar.innerHTML = `<div class="new_courseNumber_sidebar">${numberCourseRegistered.length}</div>`;

        // empty error message
        errorAxios.forEach((erro) => {
          erro.innerHTML = "";
        });

        // hide adding btn
        let ctnRegisterClass = event.target.parentElement;

        ctnRegisterClass.addEventListener("animationend", () => {
          ctnRegisterClass.remove();
        });

        ctnRegisterClass.style.animation = "scaleDown 0.3s forwards";
      } else if (typeof numberCourseRegistered == "string") {
        // erro of adding a course twice
        errorAxios.forEach((erro) => {
          erro.innerHTML = `<div class="ctn_msg error_msg">
          <strong>${numberCourseRegistered}</strong>
        </div>`;
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

btnRegisterOneCourse.forEach((btn) => {
  btn.addEventListener("click", requestRgisterOneCourse);
});
