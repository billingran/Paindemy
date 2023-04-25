const quantityDoughInput = document.querySelector("input.quantityDough");
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
    // put input ingredients 0
    event.target.value = (0).toFixed(2);

    // put label percentage 0
    percentageLabel.textContent = (0).toFixed(2);
  }
}

percentageIngredients.forEach((percentageIngredient) => {
  // add and transform for percentage label
  percentageIngredient.addEventListener("input", addAndTransformPercentage);
});

// caculate result percentage for each ingredient
function calculatePercentage(event) {
  // get quantity dough
  let quantityDough = Number(event.target.value);

  // get total percentage
  let totalPercentage = 0;

  percentageIngredients.forEach((percentageIngredient) => {
    let value = percentageIngredient.value;
    let valuePercentage = Number(value);

    // get total percentage and calculate the percentage
    if (!isNaN(quantityDough) && !isNaN(valuePercentage)) {
      totalPercentage += valuePercentage;

      let resultPercentage =
        (valuePercentage / totalPercentage) * quantityDough;

      const resultPercentageInput =
        percentageIngredient.parentElement.nextElementSibling.querySelector(
          "input.resultPercentage"
        );

      if (!isNaN(resultPercentage)) {
        resultPercentageInput.value = resultPercentage.toFixed(3);
      } else {
        resultPercentageInput.value = (0).toFixed(3);
      }
    } else {
      // put input dough 0
      event.target.value = (0).toFixed(2);
    }
  });
}

// caculate result percentage for each ingredient
quantityDoughInput.addEventListener("input", calculatePercentage);
