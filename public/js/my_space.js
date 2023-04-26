/* /////////////////////////////////////////////// */
// calculation my space
const quantityDoughInput = document.querySelector("input.quantityDough");
const percentageIngredients = document.querySelectorAll(
  "input.percentageIngredient"
);

// add, transform for percentage label and calculate percentage ingredient
function addAndTransformPercentage(event) {
  // add, transform for percentage label
  const percentageLabel =
    event.target.parentElement.nextElementSibling.querySelector("label");

  let value = event.target.value;
  let valuePercentageIngredient = Number(value);

  if (!isNaN(valuePercentageIngredient)) {
    percentageLabel.textContent = (
      (valuePercentageIngredient / 1) *
      100
    ).toFixed(2);
  } else {
    // put input ingredients 0
    event.target.value = (0).toFixed(3);

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
      event.target.value = (0).toFixed(3);
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
function calculatePercentage(event) {
  // get quantity dough
  let quantityDough = Number(event.target.value);

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
      event.target.value = (0).toFixed(3);
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
//add and delete ingredients my space

let ingredientListMyspace = document.querySelector(".ingredient_list_mySpace");
let addIngredientsBtnMyspace = document.querySelector(
  ".addIngredients_btn_mySpace"
);
let ingredientDivMyspace = document.querySelectorAll(".ingredient_div_mySpace");

function addIngredientsMyspace(e) {
  console.log(e.target);
}

// +ingredient my space
addIngredientsBtnMyspace.addEventListener("click", addIngredientsMyspace);
