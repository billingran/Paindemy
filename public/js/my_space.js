const quantityDough = document.querySelector("input.quantityDough");
const percentageIngredients = document.querySelectorAll(
  "input.percentageIngredient"
);

// add and transform for percentage label
function addAndTransformPercentage(event) {
  const percentageLabel =
    event.target.parentElement.nextElementSibling.querySelector("label");

  let valuePercentageIngredient = event.target.value;

  if (!isNaN(valuePercentageIngredient)) {
    percentageLabel.textContent = (
      (Number(valuePercentageIngredient) / 1) *
      100
    ).toFixed(2);
  } else {
    percentageLabel.textContent = (0).toFixed(2);
  }
}

percentageIngredients.forEach((percentageIngredient) => {
  // add and transform for percentage label
  percentageIngredient.addEventListener("input", addAndTransformPercentage);
});
