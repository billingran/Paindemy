let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
let ingredientList = document.querySelector(".ingredient_list");

//func animateIngredient
function animateIngredients(dltIngredient) {
  dltIngredient.target.remove();
}

//func -ingredient
function deleteIngredients(e) {
  e.preventDefault();

  let dltIngredient = e.target.parentElement;

  dltIngredient.addEventListener("animationend", animateIngredients);

  dltIngredient.style.animation = "scaleDown 0.3s forwards";
}

//func +ingredient;
function addIngredients(e) {
  e.preventDefault();

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

  ctnInput.style.animation = "scaleUp 0.3s forwards";

  // -ingredient and animateIngredient
  deleteBtn.addEventListener("click", deleteIngredients);
}

// +ingredient
addIngredientsBtn.addEventListener("click", addIngredients);
