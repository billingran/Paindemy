/* /////////////////////////////////////////////// */
//add and delete ingredients

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
//add and delete img class

let imgClassList = document.querySelector(".img_list");
let inputImgClass = document.querySelector('input[name="image_newClass"]');
let imgClassDiv = document.querySelector(".imgClass_div");

function addImgclass() {
  // get all img uploaded
  let ctnImgClassUploaded = Array.from(imgClassDiv.childNodes[1].files);

  imgClassList.innerHTML = "";

  ctnImgClassUploaded.forEach((item, index) => {
    //create ctn img uploaded
    let midCtnImgClass = document.createElement("div");
    midCtnImgClass.classList.add("centralA");

    //create delet button of ingredients
    let iconImgClass = document.createElement("div");
    iconImgClass.classList.add("img_minus_btn");
    iconImgClass.innerHTML = '<i class="uil uil-image"></i>';

    //create ctn img uploaded
    let imgClassUploaded = document.createElement("span");
    imgClassUploaded.classList.add("img_minus");
    imgClassUploaded.innerHTML = item.name;

    midCtnImgClass.appendChild(iconImgClass);
    midCtnImgClass.appendChild(imgClassUploaded);

    imgClassList.appendChild(midCtnImgClass);

    midCtnImgClass.style.animation = "scaleUp 0.3s forwards";
  });
}

// +img class
inputImgClass.addEventListener("change", addImgclass);