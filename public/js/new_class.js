/* /////////////////////////////////////////////// */
//add ingredients

let ingredientList = document.querySelector(".ingredient_list");
let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
let ingredientDiv = document.querySelectorAll(".ingredient_div");

//func remove and reset numbers of ingredient
function animateIngredients(dltIngredient) {
  dltIngredient.target.remove();

  // get ingredient numbers
  function getIngreidnetsnumbers(item) {
    return item.tagName == "DIV";
  }

  let numberIngredients = Array.from(ingredientList.childNodes).filter(
    getIngreidnetsnumbers
  );

  // reset ingredient numbers
  numberIngredients.forEach((item, index) => {
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

  // clone ctn ingredient
  let newIngredients = ingredientDiv[0].cloneNode(true);

  // get ingredient amounts
  function getIngreidnetsnumbers(item) {
    return item.tagName == "DIV";
  }

  // return only ctn ingredient
  let numberIngredients = Array.from(ingredientList.childNodes).filter(
    getIngreidnetsnumbers
  );

  //set ingredient numbers into label of ingredient
  function setIngredientsnumbers(item, index) {
    newIngredients.getElementsByTagName(
      "label"
    )[0].innerHTML = `Ingredient <span style="color:#72B955;">${
      index + 1
    }</span>`;
  }

  numberIngredients.forEach(setIngredientsnumbers);

  //create delet button of ingredients
  let deleteIngredientBtn = document.createElement("button");
  deleteIngredientBtn.setAttribute("type", "button");
  deleteIngredientBtn.classList.add("dlt_ingredients_btn");
  deleteIngredientBtn.classList.add("minus_btn");
  deleteIngredientBtn.classList.add("a_NBorder");
  deleteIngredientBtn.innerHTML = '<i class="uil uil-times up_joinus"></i>';

  // clear input value of ingredient
  let inputIngredient = newIngredients.getElementsByTagName("input")[0];
  inputIngredient.value = "";

  // delete ingredient eventListener
  deleteIngredientBtn.addEventListener("click", deleteIngredients);

  // append dlt bun of ingredient and ctn ingredient into list of ingredient
  newIngredients.appendChild(deleteIngredientBtn);
  ingredientList.appendChild(newIngredients);

  newIngredients.style.animation = "scaleUp 0.3s forwards";
}

// +ingredient
addIngredientsBtn.addEventListener("click", addIngredients);

/* /////////////////////////////////////////////// */
//add img class

let imgClasslist = document.querySelector(".img_class_list");
let addImgclassBtn = document.querySelector(".add_imgClass_btn");
let imgClassdiv = document.querySelectorAll(".imgClass_div");

function addImgclass(e) {
  e.preventDefault(imgClassdiv);

  let ctnImguploaded = imgClassdiv[0].childNodes[1].files;

  let imgUploaded = document.createElement("div");

  for (let i = 0; i < ctnImguploaded.length; i++) {
    imgUploaded.innerHTML += `<p style="color:white;">${ctnImguploaded[i].name}<p/>`;
  }

  imgClasslist.appendChild(imgUploaded);

  imgUploaded.style.animation = "scaleUp 0.3s forwards";
}

// +img class
addImgclassBtn.addEventListener("click", addImgclass);
