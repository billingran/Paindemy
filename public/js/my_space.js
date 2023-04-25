const quantityDough = document.querySelector("input.quantityDough");
const percentageIngredients = document.querySelectorAll(
  "input.percentageIngredient"
);

// add and transform for percentage label
function addAndTransformPercentage(event) {
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
    percentageLabel.textContent = (0).toFixed(2);
    event.target.value = (0).toFixed(2);
  }
}

percentageIngredients.forEach((percentageIngredient) => {
  // add and transform for percentage label
  percentageIngredient.addEventListener("input", addAndTransformPercentage);
});

// caculate result percentage for each ingredient
function calculatePercentage(event) {
  // get quantity dough
  let quantityDough = event.target.value;
  // get total percentage
  let totalPercentage = 0;

  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    // get total percentage
    if (!isNaN(valuePercentage) && !isNaN(quantityDough)) {
      totalPercentage += valuePercentage;

      let resultPercentage =
        (valuePercentage / totalPercentage) * quantityDough;

      console.log(resultPercentage.toFixed(3));
    }
  });
}

// caculate result percentage for each ingredient
quantityDough.addEventListener("input", calculatePercentage);
