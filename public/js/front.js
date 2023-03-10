// menutoggle
let menuToggle = document.querySelector(".menuToggle");
let navigation = document.querySelector(".nav_switch_container");
// let navigationContent = document.querySelector(".nav_content_container");

menuToggle.addEventListener("click", (e) => {
  navigation.classList.toggle("active");
  //   navigationContent.classList.toggle("show-menu");
});
