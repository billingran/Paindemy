/* /////////////////////////////////////////////// */
//add and delete img join us

let imgJoinUsList = document.querySelector(".img_list");
let inputJoinUs = document.querySelector('input[name="image_joinUs"]');
let imgJoinUsdiv = document.querySelector(".joinUs_div");

function addImgJoinUs() {
  // get all img uploaded
  let ctnImgJoinUsUploaded = Array.from(imgJoinUsdiv.childNodes[1].files);

  imgJoinUsList.innerHTML = "";

  ctnImgJoinUsUploaded.forEach((item, index) => {
    //create ctn img uploaded
    let midCtnImgJoinUs = document.createElement("div");
    midCtnImgJoinUs.classList.add("centralA");

    //create delet button of ingredients
    let iconImgJoinUs = document.createElement("div");
    iconImgJoinUs.classList.add("img_minus_btn");
    iconImgJoinUs.innerHTML = '<i class="uil uil-image"></i>';

    //create ctn img uploaded
    let imgJoinUsUploaded = document.createElement("span");
    imgJoinUsUploaded.classList.add("img_minus");
    imgJoinUsUploaded.innerHTML = item.name;

    midCtnImgJoinUs.appendChild(iconImgJoinUs);
    midCtnImgJoinUs.appendChild(imgJoinUsUploaded);

    imgJoinUsList.appendChild(midCtnImgJoinUs);

    midCtnImgJoinUs.style.animation = "scaleUp 0.3s forwards";
  });
}

// +img class
inputJoinUs.addEventListener("change", addImgJoinUs);
