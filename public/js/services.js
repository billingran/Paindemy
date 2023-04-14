const API_URL = "http://localhost:5000";

// register a course//////////////////////////////////////////////////
const btnMycourses = document.querySelectorAll(".btn_mycourses");

btnMycourses.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const _id = event.target.getAttribute("id");

    axios
      .post(`http://localhost:5000/course/registermycourses/`, { _id })
      .then((response) => {
        const message = response.data.message;
        alert(message);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
