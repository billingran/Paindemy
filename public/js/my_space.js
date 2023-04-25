const percentageIngredients = document.querySelectorAll(
  "input.percentageIngredient"
);

function addAndTransformPercentage(percentageIngredient) {
  const percentageLabel =
    percentageIngredient.parentElement.nextElementSibling.querySelector(
      "label"
    );

  percentageLabel.textContent = percentageIngredient.value;
}

percentageIngredients.forEach((percentageIngredient) => {
  //   percentageIngredient.addEventListener("change", addAndTransformPercentage);
  console.log(percentageIngredient.parentElement);
});
