/* /////////////////////////////////////////////// */
//add and delete ingredients

let ingredientList = document.querySelector(".ingredient_list");
let addIngredientsBtn = document.querySelector(".add_ingredients_btn");
let ingredientDiv = document.querySelectorAll(".ingredient_div");

function dltIngredientBtn() {
  //create delet button of ingredients
  let deleteIngredientBtn = document.createElement("button");
  deleteIngredientBtn.setAttribute("type", "button");
  deleteIngredientBtn.classList.add("dlt_ingredients_btn");
  deleteIngredientBtn.classList.add("minus_btn");
  deleteIngredientBtn.classList.add("a_NBorder");
  deleteIngredientBtn.innerHTML = '<i class="uil uil-times up_joinus"></i>';

  return deleteIngredientBtn;
}

// get ingredient amounts
function getIngreidnetsNumbers() {
  let numberIngredients = Array.from(ingredientList.childNodes).filter(
    (item) => item.tagName == "DIV"
  );

  return numberIngredients;
}

//func remove, reset numbers of ingredient
function animateIngredients(dltIngredient) {
  // remove ingredient
  dltIngredient.target.remove();

  //- ingredient number///////////////////////////////////////////

  // get ingredient amounts
  let numberIngredients = getIngreidnetsNumbers();

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

  //- localStorage///////////////////////////////////////////

  let numberDltIngredient = e.target.parentElement.id;
  let myParsedIngredientsList = JSON.parse(
    localStorage.getItem("myIngredientsList")
  );
  myParsedIngredientsList.forEach((item, index) => {
    if (item.code == numberDltIngredient) {
      myParsedIngredientsList.splice(index, 1);
      localStorage.setItem(
        "myIngredientsList",
        JSON.stringify(myParsedIngredientsList)
      );
    }
  });
}

//func +ingredient
function addIngredients(e) {
  e.preventDefault();

  // clone ctn ingredient
  let newIngredients = ingredientDiv[0].cloneNode(true);

  //+ ingredient number///////////////////////////////////////////

  // get ingredient amounts
  let numberIngredients = getIngreidnetsNumbers();

  //func set ingredient numbers into label of ingredient
  function setIngredientsNumbers(item, index) {
    newIngredients.getElementsByTagName(
      "label"
    )[0].innerHTML = `Ingredient <span style="color:#72B955;">${
      index + 1
    }</span>`;
  }

  // set ingredients numbers
  numberIngredients.forEach(setIngredientsNumbers);

  // clear input value of new ingredient
  newIngredients.getElementsByTagName("input")[0].value = "";

  //create delet button of ingredients
  let deleteIngredientBtn = dltIngredientBtn();

  // append dlt bun of ingredient and ctn ingredient into list of ingredient
  newIngredients.appendChild(deleteIngredientBtn);
  ingredientList.appendChild(newIngredients);

  newIngredients.style.animation = "scaleUp 0.3s forwards";

  // -ingredient///////////////////////////////////////////
  deleteIngredientBtn.addEventListener("click", deleteIngredients);

  //+ localStorage///////////////////////////////////////////

  // return only ctn ingredient for ingreident value and number
  numberIngredients = getIngreidnetsNumbers();

  // ctn ingredient for localsotrage
  let ctnmyIngredientsList = [];

  //func get ingredient value of ingredients
  function getIngredientsValue(item, index) {
    // generate random code
    let randomIngredientNumber = Math.random().toFixed(10);
    deleteIngredientBtn.setAttribute("id", randomIngredientNumber);

    // input ramdon code into each ctn ingredient
    item.setAttribute("id", randomIngredientNumber);

    // data ingredient for localStorage
    let myIngredient = {
      ingredient: item.childNodes[1].value,
      code: item.id,
    };

    // ctn ingredient for localsotrage
    ctnmyIngredientsList.push(myIngredient);
  }

  numberIngredients.forEach(getIngredientsValue);

  // store ingredients into localstorage
  let myIngredientsList = localStorage.getItem("myIngredientsList");
  if (myIngredientsList == null) {
    localStorage.setItem(
      "myIngredientsList",
      JSON.stringify(ctnmyIngredientsList)
    );
  } else {
    let myParsedIngredientsList = JSON.parse(myIngredientsList);
    myParsedIngredientsList = ctnmyIngredientsList;
    localStorage.setItem(
      "myIngredientsList",
      JSON.stringify(myParsedIngredientsList)
    );
  }
}

// +ingredient
addIngredientsBtn.addEventListener("click", addIngredients);

/* /////////////////////////////////////////////// */
//load and delete ingredients form localsotrage'

loadIngredients();

function loadIngredients() {
  let myIngredientsList = localStorage.getItem("myIngredientsList");

  if (myIngredientsList !== null) {
    // add ingredient to ingredient 0
    let myParsedIngredientsList = JSON.parse(myIngredientsList);

    ingredientDiv[0].childNodes[1].value =
      myParsedIngredientsList[0].ingredient;

    // add ingredient to other ingredients
    myParsedIngredientsList.slice(1).forEach((item, index) => {
      // clone ctn ingredient
      let newIngredients = ingredientDiv[0].cloneNode(true);
    });
  }
}

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
