const ctnNumberCourseAddedOrDeleted = document.querySelector(
  ".ctn_number_myStudents"
);

// register one course//////////////////////////////////////////////////
const btnDeleteStudents = document.querySelectorAll(
  "a.btn_deleteOneStudent_myStudents"
);

async function requestDeleteOneStudent(e) {
  e.preventDefault();

  const _id = e.target.getAttribute("id");

  try {
    const response = await axios.post(`${API_URL}/course/registeronecourse`, {
      _id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnDeleteStudents.forEach((btn) => {
  btn.addEventListener("click");
});
