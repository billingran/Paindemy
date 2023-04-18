const API_URL = "http://localhost:5000";

// register a course//////////////////////////////////////////////////
const btnRegisterClass = document.querySelectorAll(".btn_register_class");

btnRegisterClass.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const _id = event.target.getAttribute("id");
    axios
      .post(`${API_URL}/course/registerclass/${_id}`, { _id })
      .then((response) => {
        const message = response.data.message;
        alert(message);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
