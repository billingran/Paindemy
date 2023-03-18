// menutoggle
// let menuToggle = document.querySelector(".menuToggle");
// let navigation = document.querySelector(".nav_switch_container");
// // let navigationContent = document.querySelector(".nav_content_container");

// menuToggle.addEventListener("click", (e) => {
//   navigation.classList.toggle("active");
//   //   navigationContent.classList.toggle("show-menu");
// });

// + ingredient
let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
let ingredientList = document.querySelector(".ingredient_list");
// let ingredientDiv = document.querySelectorAll(".ingredient_div")[0];

function addIngredients(e) {
  e.target.preventDefault;
  //ctn input
  let ctnInput = document.createElement("div");
  ctnInput.classList.add("txt_field_auth");
  ctnInput.classList.add("ingredient_div");

  // input
  let input = document.createElement("input");
  input.setAttribute("id", "ingredient");
  input.setAttribute("type", "text");
  input.setAttribute("name", "ingredient");
  input.setAttribute("required", "");

  // span
  let span = document.createElement("span");

  // icon input
  let iconInput = document.createElement("i");
  iconInput.classList.add("up_joinus");
  iconInput.innerHTML = '<iconify-icon icon="lucide:wheat"></iconify-icon>';

  // label
  let label = document.createElement("label");
  label.setAttribute("for", "ingredient");
  label.classList.add("up_joinus");
  label.innerHTML = "Ingredient";

  //delet button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.classList.add("dlt_ingredients_btn");
  deleteBtn.classList.add("a_NBorder");
  deleteBtn.innerHTML = '<i class="uil uil-times up_joinus"></i>';

  ctnInput.appendChild(input);
  ctnInput.appendChild(span);
  ctnInput.appendChild(iconInput);
  ctnInput.appendChild(label);
  ctnInput.appendChild(deleteBtn);

  ingredientList.appendChild(ctnInput);

  // x ingredient
  let deleteIngredientsBtn = document.querySelector(".txt_field_auth button");

  //addevenlistner on red trash can to delete todo from brrowser
  deleteIngredientsBtn.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.remove();

    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  // deleteIngredientsBtn.addEventListener("click", deleteIngredients);
}

addIngredientsBtn.addEventListener("click", addIngredients);
