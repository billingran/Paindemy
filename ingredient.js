// /* /////////////////////////////////////////////// */
// /* ingredient class */

// let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
// let ingredientList = document.querySelector(".ingredient_list");

// //func animateIngredientclass
// function animateIngredients(dltIngredient) {
//   dltIngredient.target.remove();
// }

// //func -ingredient class
// function deleteIngredients(e) {
//   e.preventDefault();

//   let dltIngredient = e.target.parentElement;

//   dltIngredient.addEventListener("animationend", animateIngredients);

//   dltIngredient.style.animation = "scaleDown 0.3s forwards";
// }

// //func +ingredient class
// function addIngredients(e) {
//   e.preventDefault();

//   //ctn input +ingredient class
//   let ctnInputingredients = document.createElement("div");
//   ctnInputingredients.classList.add("txt_field_auth");
//   ctnInputingredients.classList.add("ingredient_div");

//   // input +ingredient class
//   let inputIngredient = document.createElement("input");
//   inputIngredient.setAttribute("id", "ingredient");
//   inputIngredient.setAttribute("type", "text");
//   inputIngredient.setAttribute("name", "ingredient");
//   inputIngredient.setAttribute("required", "");

//   // span +ingredient class
//   let spaningredient = document.createElement("span");

//   // icon input +ingredient class
//   let iconInputingredient = document.createElement("i");
//   iconInputingredient.classList.add("up_joinus");
//   iconInputingredient.innerHTML =
//     '<iconify-icon icon="lucide:wheat"></iconify-icon>';

//   // label +ingredient class
//   let labelIngredient = document.createElement("label");
//   labelIngredient.setAttribute("for", "ingredient");
//   labelIngredient.classList.add("up_joinus");
//   labelIngredient.innerHTML = "Ingredient";

//   //delet button -ingredient class
//   let deleteBtnIngredient = document.createElement("button");
//   deleteBtnIngredient.setAttribute("type", "button");
//   deleteBtnIngredient.classList.add("dlt_ingredients_btn");
//   deleteBtnIngredient.classList.add("a_NBorder");
//   deleteBtnIngredient.innerHTML = '<i class="uil uil-times up_joinus"></i>';

//   ctnInputingredients.appendChild(inputIngredient);
//   ctnInputingredients.appendChild(spaningredient);
//   ctnInputingredients.appendChild(iconInputingredient);
//   ctnInputingredients.appendChild(labelIngredient);
//   ctnInputingredients.appendChild(deleteBtnIngredient);

//   ingredientList.appendChild(ctnInputingredients);

//   ctnInputingredients.style.animation = "scaleUp 0.3s forwards";

//   // -ingredient class and animateIngredientclass
//   deleteBtnIngredient.addEventListener("click", deleteIngredients);
// }

// // +ingredient class
// addIngredientsBtn.addEventListener("click", addIngredients);

// /* /////////////////////////////////////////////// */
// /* image class */

// let addImgclassBtn = document.querySelector(".add_imgClass_btn");
// let imgClasslist = document.querySelector(".img_class_list");

// //func +img class
// function addIngredients(e) {
//   e.preventDefault();

//   //ctn input +img class
//   let ctnImgclass = document.createElement("div");
//   ctnImgclass.classList.add("txt_field_auth");
//   ctnImgclass.classList.add("imgClass_div");

//   // input +img class
//   let inputImgclass = document.createElement("input");
//   inputImgclass.setAttribute("id", "image_newClass");
//   inputImgclass.setAttribute("type", "file");
//   inputImgclass.setAttribute("name", "image_newClass");
//   inputImgclass.setAttribute("accept", "image/*");
//   inputImgclass.setAttribute("required", "");

//   // span +img class
//   let spanImgclass = document.createElement("span");

//   // label +img class
//   let labelImgclass = document.createElement("label");
//   labelImgclass.setAttribute("for", "image_newClass");
//   labelImgclass.classList.add("up_joinus");
//   labelImgclass.classList.add("a_NBorder");
//   labelImgclass.innerHTML = "Ingredient";
//   deleteBtnIngredient.innerHTML = '<i class="uil uil-times up_joinus"></i>';
// }

// // +img class
// addImgclassBtn.addEventListener("click", addIngredients);
