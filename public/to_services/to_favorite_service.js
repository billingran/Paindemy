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

    console.log(response);
    console.log(numberAllFavorites);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

btnDeleteOneFavorite.forEach((btn) => {
  btn.addEventListener("click", requestDeleteOneFavorite);
});
