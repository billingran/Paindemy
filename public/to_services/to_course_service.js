const API_URL = "http://localhost:5000";

// register a course//////////////////////////////////////////////////
const btnRegisterClass = document.querySelectorAll(".btn_register_class");
const ctnNumberCourseRegistered = document.querySelector(".ctn_course_number");
const ctnNumberCourseRegisteredSidebar = document.querySelector(
  ".ctn_courseNumber_sidebar"
);

btnRegisterClass.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const _id = event.target.getAttribute("id");
    axios
      .post(API_URL, { _id })
      .then((response) => {
        const numberCourseRegistered = response.data.length;

        ctnNumberCourseRegistered.innerHTML = `<div class="new_course_number">${numberCourseRegistered}</div>`;
        ctnNumberCourseRegisteredSidebar.innerHTML = `<div class="new_courseNumber_sidebar">${numberCourseRegistered}</div>`;
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
