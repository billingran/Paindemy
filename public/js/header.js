//header background
let headerBackground = document.querySelector(".header");
let ctnHeader = document.querySelector(".ctn_header");
let formHomeOne = document.querySelector(".form_homeOne");
let iconSearchHomeOne = document.querySelector(".icon_search_homeOne");

function turnNavColor() {
  if (window.pageYOffset) {
    headerBackground.style =
      "background-color:rgba(220,164,125,0.7); box-shadow: 0 8px 6px -6px rgba(0,0,0,0.3);";
    ctnHeader.style = "border: none";
    formHomeOne.style = "background: rgba(243,243,243,0.7) ";
    iconSearchHomeOne.style = "color:var(--C-6E1D0E)";
  } else {
    headerBackground.style = "";
    ctnHeader.style = "";
    formHomeOne.style = "";
    iconSearchHomeOne.style = "";
  }
}

window.addEventListener("scroll", turnNavColor);

// buger;
let ctnBurger = document.querySelectorAll(".ctn_burger");
let burger = document.querySelectorAll(".burger");
let sideBarHeader = document.querySelector(".side_bar_header");

burger[0].addEventListener("click", (e) => {
  ctnBurger[0].classList.toggle("active");
  ctnBurger[1].classList.toggle("active");
  sideBarHeader.classList.toggle("show_side_bar");
});

burger[1].addEventListener("click", (e) => {
  ctnBurger[0].classList.toggle("active");
  ctnBurger[1].classList.toggle("active");
  sideBarHeader.classList.toggle("show_side_bar");
});
