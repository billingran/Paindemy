/* /////////////////////////////////////////////// */
// calculation my space
const quantityDoughInput = document.querySelector("input.quantityDough");
const percentageIngredients = document.querySelectorAll(
  "input.percentageIngredients"
);

// add, transform for percentage label and calculate percentage ingredient
function addAndTransformPercentage(e) {
  // add, transform for percentage label
  const percentageLabel =
    e.target.parentElement.nextElementSibling.querySelector("label");

  let value = e.target.value;
  let valuePercentageIngredient = Number(value);

  if (!isNaN(valuePercentageIngredient)) {
    percentageLabel.textContent = (
      (valuePercentageIngredient / 1) *
      100
    ).toFixed(2);
  } else {
    // put input ingredients 0
    e.target.value = (0).toFixed(3);

    // put label percentage 0
    percentageLabel.textContent = (0).toFixed(2);
  }

  // calculate the percentage of percentage ingredient
  // get quantity dough
  let quantityDough = Number(quantityDoughInput.value);

  // ctn get total percentage
  let totalPercentage = 0;

  // get total percentage
  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    if (!isNaN(quantityDough) && !isNaN(valuePercentage)) {
      totalPercentage += valuePercentage;
    } else {
      // put input dough 0
      e.target.value = (0).toFixed(3);
    }
  });

  // calculate the percentage of percentage ingredient
  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    let resultPercentage = (valuePercentage / totalPercentage) * quantityDough;

    const resultPercentageInput =
      percentageIngredient.parentElement.nextElementSibling.querySelector(
        "input.resultPercentage"
      );

    if (!isNaN(resultPercentage)) {
      resultPercentageInput.value = resultPercentage.toFixed(3);
    } else {
      resultPercentageInput.value = (0).toFixed(3);
    }
  });
}

percentageIngredients.forEach((percentageIngredient) => {
  // add, transform for percentage label and calculate percentage ingredient
  percentageIngredient.addEventListener("input", addAndTransformPercentage);
});

// calculate the percentage of quantity dough
function calculatePercentage(e) {
  // get quantity dough
  let quantityDough = Number(e.target.value);

  // ctn get total percentage
  let totalPercentage = 0;

  // get total percentage
  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    if (!isNaN(quantityDough) && !isNaN(valuePercentage)) {
      totalPercentage += valuePercentage;
    } else {
      // put input dough 0
      e.target.value = (0).toFixed(3);
    }
  });

  // calculate the percentage of quantity dough
  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    let resultPercentage = (valuePercentage / totalPercentage) * quantityDough;

    const resultPercentageInput =
      percentageIngredient.parentElement.nextElementSibling.querySelector(
        "input.resultPercentage"
      );

    if (!isNaN(resultPercentage)) {
      resultPercentageInput.value = resultPercentage.toFixed(3);
    } else {
      resultPercentageInput.value = (0).toFixed(3);
    }
  });
}

// calculate the percentage of quantity dough
quantityDoughInput.addEventListener("input", calculatePercentage);

/* /////////////////////////////////////////////// */
//add, delete ingredients and also give "input listener" my space

let ingredientListMySpace = document.querySelector(".ingredient_list_mySpace");
let addIngredientsBtnMySpace = document.querySelector(
  ".addIngredients_btn_mySpace"
);
let ingredientDivMySpace = document.querySelectorAll(".ingredient_div_mySpace");

// func generate dlt ingredient btn my space
function dltIngredientBtnMySpace() {
  //create delet button of ingredients my space
  let deleteIngredientBtnMySpace = document.createElement("button");
  deleteIngredientBtnMySpace.setAttribute("type", "button");
  deleteIngredientBtnMySpace.classList.add("dlt_ingredientsBtn_mySpace");
  deleteIngredientBtnMySpace.classList.add("minus_btn");
  deleteIngredientBtnMySpace.classList.add("a_NBorder");
  deleteIngredientBtnMySpace.innerHTML =
    '<i class="uil uil-times up_joinus"></i>';

  return deleteIngredientBtnMySpace;
}

//func remove ingredient my space
function animateIngredientsMySpace(dltIngredient) {
  // remove ingredient my space
  dltIngredient.target.remove();
}

//func -ingredient my space
function deleteIngredientsMySpace(e) {
  e.preventDefault();

  let dltIngredientMySpace = e.target.parentElement.parentElement;

  dltIngredientMySpace.addEventListener(
    "animationend",
    animateIngredientsMySpace
  );

  dltIngredientMySpace.style.animation = "scaleDown 0.3s forwards";
}

//func +ingredient my space
function addIngredientsMySpace(e) {
  e.preventDefault();

  // clone ctn ingredient my space
  let newIngredientsMySpace = ingredientDivMySpace[0].cloneNode(true);

  // clear input value of new ingredient my space
  Array.from(newIngredientsMySpace.getElementsByTagName("input")).forEach(
    (inputMySpace) => {
      inputMySpace.value = "";
    }
  );

  //create delet button of ingredients
  let ctnDeleteIngredientBtnMySpace =
    newIngredientsMySpace.getElementsByTagName("div")[1];
  let deleteIngredientBtnMySpace = dltIngredientBtnMySpace();

  // append dlt bun of ingredient my space and ctn ingredient my space into list of ingredient my space
  ctnDeleteIngredientBtnMySpace.appendChild(deleteIngredientBtnMySpace);
  ingredientListMySpace.appendChild(newIngredientsMySpace);

  newIngredientsMySpace.style.animation = "scaleUp 0.3s forwards";

  // -ingredient my space ///////////////////////////////////////////
  deleteIngredientBtnMySpace.addEventListener(
    "click",
    deleteIngredientsMySpace
  );
}

// +ingredient my space
addIngredientsBtnMySpace.addEventListener("click", addIngredientsMySpace);

/* /////////////////////////////////////////////// */
//add and delete img new class

let imgMySpaceList = document.querySelector(".img_list");
let inputImgMySpaceList = document.querySelector('input[name="imageFavorite"]');
let imgMySpaceDiv = document.querySelector(".imgMySpace_div");

//func + img new class
function addImgclass() {
  // get all img new class uploaded
  let ctnImgClassUploaded = Array.from(imgMySpaceDiv.childNodes[1].files);

  imgMySpaceList.innerHTML = "";

  ctnImgClassUploaded.forEach((item, index) => {
    //create ctn img new class uploaded
    let midCtnImgClass = document.createElement("div");
    midCtnImgClass.classList.add("centralA");

    //create icon of new classe
    let iconImgClass = document.createElement("div");
    iconImgClass.classList.add("img_minus_btn");
    iconImgClass.innerHTML = '<i class="uil uil-image"></i>';

    //create img new class uploaded
    let imgClassUploaded = document.createElement("span");
    imgClassUploaded.classList.add("img_minus");
    imgClassUploaded.innerHTML = item.name;

    midCtnImgClass.appendChild(iconImgClass);
    midCtnImgClass.appendChild(imgClassUploaded);

    imgMySpaceList.appendChild(midCtnImgClass);

    midCtnImgClass.style.animation = "scaleUp 0.3s forwards";
  });
}

// +img new class
inputImgMySpaceList.addEventListener("change", addImgclass);
