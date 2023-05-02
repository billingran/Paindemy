const API_URL = "http://localhost:5000";
const errorAxios = document.querySelectorAll(".errorAxios");

const ctnNumberStudentAddedOrDeleted = document.querySelector(
  ".ctn_number_myStudents"
);

// delete one student//////////////////////////////////////////////////
const btnDeleteStudents = document.querySelectorAll(
  ".btn_deleteOneStudent_myStudents"
);

async function requestDeleteOneStudent(e) {
  e.preventDefault();

  const student_id = e.target.getAttribute("student-id");
  const course_id = e.target.getAttribute("course-id");

  try {
    const response = await axios.post(`${API_URL}/auth/deleteonestudent`, {
      student_id,
      course_id,
    });

    const numberStudentsMyStudents = response.data;

    if (numberStudentsMyStudents.message) {
      // erro of not one instructor
      let redirectUrlDeleteOnecCourse = "/auth/login";
      window.location.href = redirectUrlDeleteOnecCourse;
    } else {
      // get new number students of the course
      ctnNumberStudentAddedOrDeleted.getElementsByTagName("div")[0].remove;

      ctnNumberStudentAddedOrDeleted.innerHTML = ` <div class="new_number_myStudents">${numberStudentsMyStudents.studentsCourse.length}</div>`;

      // hide and remove info sutdent deleted
      let ctnInfoStudentDeleted = e.target.parentElement;

      ctnInfoStudentDeleted.addEventListener("animationend", () => {
        ctnInfoStudentDeleted.remove();
      });

      ctnInfoStudentDeleted.style.animation = "scaleDown 0.3s forwards";
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnDeleteStudents.forEach((btn) => {
  btn.addEventListener("click", requestDeleteOneStudent);
});

// add one student//////////////////////////////////////////////////
async function requestAddOneStudent(e) {
  e.preventDefault();

  // get the data of the form to add one student
  const form = e.currentTarget;
  const formData = new FormData(form);
}

document
  .getElementById("add_oneStudent_form")
  .addEventListener("submit", requestAddOneStudent);
