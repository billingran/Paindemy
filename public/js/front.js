// menutoggle
// let menuToggle = document.querySelector(".menuToggle");
// let navigation = document.querySelector(".nav_switch_container");
// // let navigationContent = document.querySelector(".nav_content_container");

// menuToggle.addEventListener("click", (e) => {
//   navigation.classList.toggle("active");
//   //   navigationContent.classList.toggle("show-menu");
// });

let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
let ingredientList = document.querySelector(".ingredient_list");
let ingredientDiv = document.querySelectorAll(".ingredient_div");

//func animateIngredient
function animateIngredients(dltIngredient) {
  dltIngredient.target.remove();

  // reset ingredient numbers
  function getnumbers(item) {
    return item.tagName == "DIV";
  }

  let NumberIngredients = Array.from(ingredientList.childNodes).filter(
    getnumbers
  );

  NumberIngredients.forEach((item, index) => {
    item.getElementsByTagName(
      "label"
    )[0].innerHTML = `Ingredient <span style="color:#72B955;">${index}</span>`;
  });
}

//func -ingredient
function deleteIngredients(e) {
  e.preventDefault();

  let dltIngredient = e.target.parentElement;

  dltIngredient.addEventListener("animationend", animateIngredients);

  dltIngredient.style.animation = "scaleDown 0.3s forwards";
}

function addIngredients(e) {
  e.preventDefault();

  // clone input
  let newIngredients = ingredientDiv[0].cloneNode(true);

  // get ingredient numbers
  function getnumbers(item) {
    return item.tagName == "DIV";
  }

  let NumberIngredients = Array.from(ingredientList.childNodes).filter(
    getnumbers
  );

  //set ingredient numbers
  function setnumbers(item, index) {
    newIngredients.getElementsByTagName(
      "label"
    )[0].innerHTML = `Ingredient <span style="color:#72B955;">${
      index + 1
    }</span>`;
  }

  NumberIngredients.forEach(setnumbers);

  //create delet button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.classList.add("dlt_ingredients_btn");
  deleteBtn.classList.add("a_NBorder");
  deleteBtn.innerHTML = '<i class="uil uil-times up_joinus"></i>';

  // clear input value
  let input = newIngredients.getElementsByTagName("input")[0];
  input.value = "";

  // delete eventListener
  deleteBtn.addEventListener("click", deleteIngredients);

  // append tags
  newIngredients.appendChild(deleteBtn);
  ingredientList.appendChild(newIngredients);

  newIngredients.style.animation = "scaleUp 0.3s forwards";
}

// +ingredient
addIngredientsBtn.addEventListener("click", addIngredients);
