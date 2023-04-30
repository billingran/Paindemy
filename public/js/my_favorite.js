let deleteIngredientBtnMyFavorites = document.querySelectorAll(
  ".dlt_ingredientsBtn_myFavorite"
);

//func remove ingredient my favorite
function animateIngredientsMyFavorite(dltIngredient) {
  // remove ingredient my space
  dltIngredient.target.remove();
}

//func -ingredient my space
function deleteIngredientsMyFavorite(e) {
  e.preventDefault();

  let dltIngredientMyFavorite = e.target.parentElement.parentElement;

  dltIngredientMyFavorite.addEventListener(
    "animationend",
    animateIngredientsMyFavorite
  );

  dltIngredientMyFavorite.style.animation = "scaleDown 0.3s forwards";
}

// -ingredient my favorite ///////////////////////////////////////////
deleteIngredientBtnMyFavorites.forEach((btn) => {
  btn.addEventListener("click", deleteIngredientsMyFavorite);
});
