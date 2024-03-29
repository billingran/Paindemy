//header background
let headerBackground = document.querySelector(".header");
let ctnHeader = document.querySelector(".ctn_header");
let formHomeOne = document.querySelector(".form_homeOne");
let iconSearchHomeOne = document.querySelector(".icon_search_homeOne");
let midTextHome = document.querySelector(".title_header rect");

// buger;
let ctnBurger = document.querySelectorAll(".ctn_burger");
let burger = document.querySelectorAll(".burger");
let sideBarHeader = document.querySelector(".side_bar_header");

function turnNavColor() {
  if (window.pageYOffset) {
    headerBackground.style =
      "background-color:rgba(220,164,125,0.7); box-shadow: 0 8px 6px -6px rgba(0,0,0,0.3);";
    ctnHeader.style = "border: none";
    formHomeOne.style = "background: rgba(243,243,243,0.7) ";
    iconSearchHomeOne.style = "color:var(--C-6E1D0E)";
    midTextHome.classList.add("midText_titme_homeOne");
  } else {
    headerBackground.style = "";
    ctnHeader.style = "";
    formHomeOne.style = "";
    iconSearchHomeOne.style = "";
    midTextHome.classList.remove("midText_titme_homeOne");
  }

  // scroll the mouse to hide sidebar
  ctnBurger[0].classList.remove("active");
  ctnBurger[1].classList.remove("active");
  sideBarHeader.classList.remove("show_side_bar");
}

window.addEventListener("scroll", turnNavColor);

// click burger outside to show sidebar
burger[0].addEventListener("click", (e) => {
  ctnBurger[0].classList.add("active");
  ctnBurger[1].classList.add("active");
  sideBarHeader.classList.add("show_side_bar");
});

// click burger inside to hide sidebar
burger[1].addEventListener("click", (e) => {
  ctnBurger[0].classList.remove("active");
  ctnBurger[1].classList.remove("active");
  sideBarHeader.classList.remove("show_side_bar");
});

// click others to hide sidebar
window.addEventListener("click", (e) => {
  // check if the burger was clicked
  const isBurgerClicked = Array.from(burger).some((burger) =>
    burger.contains(e.target)
  );
  if (
    !sideBarHeader.contains(e.target) &&
    e.target !== sideBarHeader &&
    !isBurgerClicked
  ) {
    ctnBurger[0].classList.remove("active");
    ctnBurger[1].classList.remove("active");
    sideBarHeader.classList.remove("show_side_bar");
  }
});
