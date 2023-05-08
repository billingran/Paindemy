const API_URL = process.env.API_URL;
const errorAxios = document.querySelectorAll(".errorAxios");

const ctnNumberStudentAddedOrDeleted = document.querySelector(
  ".ctn_number_myStudents"
);

// delete one student//////////////////////////////////////////////////
const btnDeleteStudents = document.querySelectorAll(
  "a.btn_deleteOneStudent_myStudents"
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
      let redirectUrlDeleteOneStudent = "/auth/login";
      window.location.href = redirectUrlDeleteOneStudent;
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

const myStudentList = document.querySelector(".myStudent_list");

async function requestAddOneStudent(e) {
  e.preventDefault();

  // get the data of the form to add one student
  const form = e.currentTarget;
  const formData = new FormData(form);

  const _id = formData.get("idCourse");
  const emailUser = formData.get("emailUser");

  const url = form.dataset.ajaxurl;

  try {
    const response = await axios.post(`${API_URL}${url}`, {
      _id,
      emailUser,
    });

    const studentAddedMyStudents = response.data;

    if (typeof studentAddedMyStudents == "string") {
      // erro of adding one course twice
      errorAxios.forEach((erro) => {
        erro.innerHTML = `<div class="ctn_msg error_msg">
        <strong>${studentAddedMyStudents}</strong>
      </div>`;
      });
    } else if (studentAddedMyStudents.message) {
      // erro of not one instructor
      let redirectUrlAddOneStudent = "/auth/login";
      window.location.href = redirectUrlAddOneStudent;
    } else {
      // get new number students of the course
      ctnNumberStudentAddedOrDeleted.getElementsByTagName("div")[0].remove;

      ctnNumberStudentAddedOrDeleted.innerHTML = ` <div class="new_number_myStudents">${studentAddedMyStudents.newNumberMyStudents.studentsCourse.length}</div>`;

      // get info student of the course

      myStudentList.innerHTML += `<div class="ctn_my_students scaleUp">
      <div class="info_my_students">
        <div class="name_my_students">
          <i class="uil uil-graduation-cap icon_my_students"></i> 
          ${studentAddedMyStudents.studentAdded.firstnameUser} ${studentAddedMyStudents.studentAdded.lastnameUser}
        </div>
        <div class="email_my_students">
          <i class="uil uil-envelope-alt icon_my_students"></i>
          ${studentAddedMyStudents.studentAdded.emailUser}
        </div>
      </div>
      <a
        href="#"
        class="btn_deleteOneStudent_myStudents minus_btn a_NBorder"
        student-id="${studentAddedMyStudents.studentAdded._id}"
        course-id="${studentAddedMyStudents.newNumberMyStudents._id}"
      >
        <i class="uil uil-times"></i>
      </a>
    </div>`;

      // listen new info student of delete one student btn
      const newBtnDeleteStudent = myStudentList.querySelectorAll(
        `.btn_deleteOneStudent_myStudents`
      );

      newBtnDeleteStudent.forEach((btn) => {
        btn.addEventListener("click", requestDeleteOneStudent);
      });

      // give each new ctn info student animation scale up and then remove it
      const newElements = document.querySelectorAll(".scaleUp");
      newElements.forEach((element) => {
        element.style.animation = "scaleUp 0.3s forwards";
        element.classList.remove("scaleUp");
        element.addEventListener("animationend", (e) => {
          element.removeAttribute("style");
        });
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

document
  .getElementById("add_oneStudent_form")
  .addEventListener("submit", requestAddOneStudent);
