const ctnNumberAllFavorite = document.querySelector(".ctn_allFavorites_number");
const ctnNumberAllFavoriteSidebar = document.querySelector(
  ".ctn_allFavoritesNumber_sidebar"
);

// delete a favorite//////////////////////////////////////////////////
const btnDeleteOneFavorite = document.querySelectorAll(
  ".btn_delete_oneFavorite"
);

async function requestDeleteOneFavorite(e) {
  e.preventDefault();

  const _id = e.target.getAttribute("id");

  try {
    const response = await axios.post(`${API_URL}/course/deleteonefavorite`, {
      _id,
    });

    const numberAllFavorites = response.data;

    if (Array.isArray(numberAllFavorites)) {
      // get new number favorites of user
      ctnNumberAllFavorite.innerHTML = `<div class="new_allFavorites_number">${numberAllFavorites.length}</div>`;
      ctnNumberAllFavoriteSidebar.innerHTML = `<div class="new_allFavoritesNumber_sidebar">${numberAllFavorites.length}</div>`;

      // hide and remove favorites template
      let ctnDeleteOneFavorite =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;

      ctnDeleteOneFavorite.addEventListener("animationend", () => {
        ctnDeleteOneFavorite.remove();
      });

      ctnDeleteOneFavorite.style.animation = "scaleDown 0.3s forwards";
    } else if (numberAllFavorites.message) {
      // erro of not a user
      let redirectUrlDeleteOneFavorite = "/auth/login";
      window.location.href = redirectUrlDeleteOneFavorite;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnDeleteOneFavorite.forEach((btn) => {
  btn.addEventListener("click", requestDeleteOneFavorite);
});
