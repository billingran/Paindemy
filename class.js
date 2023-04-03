// courses
// async function insertDymmyRecipeData() {
//   try {
//     await Course.insertMany([
//       {
//         nameCourse: "Baguette",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Baguette is a type of bread that originated in France in the 18th century. It is a long, thin loaf with a crispy crust and a soft, chewy interior. The word "baguette" comes from the French word for "wand" or "stick," which describes the shape of the bread.

//               Baguette quickly became popular in France and eventually became a symbol of French culture and cuisine. It is traditionally made with just four basic ingredients: flour, water, yeast, and salt.

//               Baguette is a versatile bread that can be eaten on its own or used as the base for sandwiches, crostini, and other dishes. It is enjoyed around the world and has become a staple of many bakery and café menus.`,
//         categoryCourse: "Bakery",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Eau",
//           "Sel",
//           "Levure",
//           "Levain",
//           "Bassinage",
//         ],
//         imageCourse: "baguette.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },

//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pain de mie",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse:
//           "Pain de mie is a type of bread that originated in France and is now enjoyed around the world. It is also known as sandwich bread, as it is often used to make sandwiches. Pain de mie is a soft, dense bread with a fine crumb and a tender crust. It is made with a high proportion of milk and sugar, which gives it its unique texture and flavor. Pain de mie is typically baked in a rectangular loaf pan with a tight-fitting lid, which helps to create a uniform shape and texture. This bread is often sliced thinly and used for sandwiches or toasted for breakfast.",
//         categoryCourse: "Bakery",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine de force",
//           "Sucre",
//           "Sel",
//           "Levure",
//           "Poudre de lait",
//           "Eau",
//           "Beurre",
//         ],
//         imageCourse: "pain_de_mie.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pain au levain",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Pain au levain is a type of bread that originated in France and is now popular in many parts of the world. It is also known as sourdough bread, as it is made using a naturally fermented dough that gives the bread a distinctive sour flavor.

//           Pain au levain is typically made with just three basic ingredients: flour, water, and salt. The dough is fermented using wild yeast and bacteria, which are naturally present in the flour and the environment. This fermentation process can take several hours or even days, depending on the recipe and the desired flavor and texture of the bread.

//           The resulting bread has a tangy, complex flavor and a chewy texture with a crisp crust. It is often enjoyed on its own or used as the base for sandwiches and toast. Pain au levain is a popular choice for bread lovers who appreciate the unique flavor and texture that comes from natural fermentation.`,
//         categoryCourse: "Bakery",
//         caloriesCourse: 400,
//         ingredientsCourse: ["Farine T65", "Eau", "Sel", "Levain"],
//         imageCourse: "pain_au_levain.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Nordika",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Nordika is a type of bread that originated in Scandinavia and is now enjoyed in many parts of the world. It is a dense, dark bread made with rye flour and often includes other grains and seeds such as sunflower seeds and flaxseed. Nordika is a hearty bread that is rich in fiber, protein, and other nutrients.

//           The dough for Nordika is typically made with a sourdough starter, which adds to the bread's distinct flavor and helps to improve its shelf life. The dough is left to ferment for several hours or even days, which contributes to the bread's dense texture and tangy flavor.

//           Nordika is often sliced thinly and used as the base for open-faced sandwiches, known as smørrebrød in Scandinavia. It is also delicious toasted and served with butter and jam or used as a hearty base for avocado toast. Nordika is a popular choice for those looking for a flavorful, nutrient-dense bread that is both delicious and satisfying.`,
//         categoryCourse: "Bakery",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T80",
//           "Farine Nordika",
//           "Eau",
//           "Sel",
//           "Levure",
//           "Levain",
//         ],
//         imageCourse: "nordika.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pain au khorazan",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Pain au khorasan is a type of bread made from khorasan wheat, which is also known as Kamut. This ancient grain is believed to have originated in Egypt and is now grown in many parts of the world.

//           Pain au khorasan has a distinctive nutty flavor and a dense, chewy texture. It is often made with a sourdough starter, which gives the bread a tangy flavor and helps to improve its shelf life. The dough for Pain au khorasan is typically left to ferment for several hours or even days, which contributes to the bread's dense texture and complex flavor.

//           Khorasan wheat is a rich source of protein, fiber, and other nutrients, making Pain au khorasan a nutritious choice for those looking for a healthy bread option. It is often enjoyed on its own or used as the base for sandwiches and toast.

//           Pain au khorasan is a popular choice for those looking for a unique and flavorful bread that is also nutritious and satisfying.`,
//         categoryCourse: "Bakery",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine Khorazan",
//           "Eau",
//           "Sel",
//           "Levure",
//           "Levain",
//           "Bassinage",
//           "Graines",
//           "Hydra Graines",
//         ],
//         imageCourse: "pain_au_khorazan.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Croissant",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse:
//           "Croissant is a popular French pastry that is famous all over the world. It is a flaky, buttery pastry that is usually eaten for breakfast or as a snack. The croissant is made from a yeast-leavened dough that is layered with butter and then rolled and folded several times to create its distinct flaky texture. The croissant is shaped like a crescent moon, with a crispy outer layer and a soft, buttery interior. The croissant is often served plain or with a variety of fillings, such as chocolate, almond paste, or ham and cheese. The croissant is a delicious and indulgent treat that has become a beloved staple of French cuisine and a symbol of French culture.",
//         categoryCourse: "Pastry",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Sucre",
//           "Sel",
//           "Levure",
//           "Beurre",
//           "Lait",
//           "Eau",
//         ],
//         imageCourse: "croissant.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pain au chocolate",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse:
//           "Pain au chocolat, also known as chocolate croissant, is a delicious French pastry that is enjoyed all over the world. It is made from a yeast-leavened dough that is layered with butter and then wrapped around pieces of chocolate, typically dark chocolate. The pastry is shaped into a long rectangular shape and baked until golden brown. Pain au chocolat has a crispy outer layer with a soft and buttery interior, and the melted chocolate in the center adds a rich and indulgent flavor. Pain au chocolat is often enjoyed for breakfast or as a snack with coffee or tea. It is a popular item in bakeries and cafes around the world, and its delicious combination of buttery pastry and rich chocolate has made it a beloved treat for many.",
//         categoryCourse: "Pastry",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Sucre",
//           "Sel",
//           "Levure",
//           "Beurre",
//           "Lait",
//           "Eau",
//           "Oeuf",
//           "Chocolate",
//         ],
//         imageCourse: "pain_au_chocolate.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pain au raisins",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Pain au raisins, also known as raisin buns or cinnamon rolls, is a popular French pastry made with a laminated dough that is filled with custard or pastry cream and raisins. The dough used to make pain au raisins is similar to the dough used in croissants, and is made by layering butter between layers of dough and folding it multiple times to create a flaky, buttery texture.

//           After the dough is prepared, it is rolled out and spread with a mixture of custard or pastry cream, raisins, and often cinnamon or other spices. The dough is then rolled up into a spiral and cut into individual portions, which are left to rise before being baked until golden brown.

//           Pain au raisins is a popular breakfast pastry in France, and is often enjoyed with a cup of coffee or tea. It can also be found in bakeries and cafes around the world, and variations may include different types of fillings, such as chocolate or almond paste.`,
//         categoryCourse: "Pastry",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Sucre",
//           "Sel",
//           "Levure",
//           "Beurre",
//           "Lait",
//           "Eau",
//           "Oeuf",
//           "raisins",
//           "sucre marron",
//           "canelle",
//           "muscade",
//         ],
//         imageCourse: "pain_au_raisins.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Brioche",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Brioche is a French pastry that is similar to bread but richer and sweeter due to the high amount of butter and eggs used in the recipe. Brioche dough is typically enriched with sugar, eggs, milk, and butter, resulting in a soft, tender, and slightly flaky texture. Brioche can be shaped in various ways, such as small rolls, large loaves, or as a base for other pastries, such as the famous French dessert, Tarte Tatin.

//           Brioche has been a staple of French cuisine for centuries and is commonly enjoyed for breakfast or as a snack with coffee or tea. It is also used in a variety of sweet and savory dishes, such as French toast, hamburgers, and sandwiches. Due to its rich and buttery flavor, brioche is often considered a luxurious pastry and is a popular item in high-end bakeries and restaurants around the world.`,
//         categoryCourse: "Pastry",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine de force",
//           "Oeufs",
//           "Sel",
//           "Levure",
//           "Sucre",
//           "Beurre",
//         ],
//         imageCourse: "brioche.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Brioche au sucre",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Brioche au sucre is a type of sweet bread that is a variation of the classic French brioche pastry. It is made with the same rich, buttery dough as brioche, but is sweetened with sugar and often topped with large sugar crystals for a crunchy texture.

//           To prepare brioche au sucre, the dough is made by combining flour, sugar, eggs, milk, butter, and yeast. The dough is then kneaded and left to rise before being shaped into individual brioche rolls. The rolls are brushed with an egg wash and topped with sugar crystals before being baked until golden brown.

//           Brioche au sucre is a popular pastry in France and can be enjoyed for breakfast or as a sweet snack throughout the day. It is often served with coffee or tea, and variations may include additional ingredients such as chocolate chips or raisins. The rich, buttery texture and sweet flavor of brioche au sucre make it a delicious treat for those with a sweet tooth.`,
//         categoryCourse: "Pastry",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine de force",
//           "Oeufs",
//           "Sel",
//           "Levure",
//           "Sucre",
//           "Beurre",
//         ],
//         imageCourse: "brioche_au_sucre.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Pizza",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Pizza is a popular Italian dish that has become a global favorite. It is a flatbread topped with tomato sauce, cheese, and various toppings, which can include vegetables, meats, and seafood. The origins of pizza can be traced back to ancient civilizations in the Mediterranean, where flatbreads were topped with ingredients such as herbs, cheese, and oil.

//           Pizza as we know it today, however, originated in Naples, Italy in the late 18th century, where it was known as "Neapolitan pizza." The pizza was made with tomatoes, which were introduced to Italy in the 16th century, and mozzarella cheese, which was produced locally in the Campania region. Today, pizza has evolved into a global phenomenon, with countless variations and toppings that vary by region and personal preference.

//           Pizza is typically cooked in a wood-fired oven, which gives the crust a crispy texture and imparts a smoky flavor. It can also be cooked in a conventional oven or on a grill. Pizza is often enjoyed with a variety of beverages, such as beer, soda, or wine, and is a popular food for gatherings, parties, and casual dining.`,
//         categoryCourse: "Other",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Farine de seigle noire",
//           "Eau",
//           "Huile d’olive",
//           "Oeufs",
//           "Levure",
//           "Sel",
//         ],
//         imageCourse: "pizza.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Gua Bao",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Gua Bao, also known as Taiwanese pork belly buns or steamed buns, is a traditional Taiwanese street food that has become popular around the world. Gua Bao consists of a soft, fluffy steamed bun that is folded in half and filled with tender, savory pork belly, pickled vegetables, and a variety of sauces and seasonings.

//           The buns are made from a simple dough that is steamed until light and fluffy. The pork belly is typically marinated with soy sauce, sugar, garlic, and other spices, then slow-cooked until it is tender and flavorful. The pickled vegetables, which can include carrots, cucumber, and daikon radish, add a tangy and crunchy texture to the dish.

//           Gua Bao is often served as a street food in Taiwan, and can also be found in restaurants and food stalls around the world. It is a popular snack or light meal, and can be enjoyed as a savory and satisfying treat any time of day. Vegetarian and other variations of Gua Bao are also available, making it a versatile dish suitable for a wide range of tastes and preferences.`,
//         categoryCourse: "Other",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Lait",
//           "Sucre",
//           "Levure",
//           "Sel",
//           "Levure chimique",
//           "Eau",
//         ],
//         imageCourse: "gua_bao.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Nann",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Naan is a type of flatbread that is a staple in many cuisines of South Asia and Central Asia, including Indian, Pakistani, and Afghan cuisines. It is typically made with a combination of wheat flour, yeast, salt, and water, and may also include ingredients such as yogurt, milk, or ghee.

//           The dough is kneaded and then allowed to rest and rise before being flattened and cooked in a tandoor oven, which gives the bread a distinctive smoky flavor and slightly charred texture. Naan can also be cooked on a stovetop, either in a pan or directly on a flame, to achieve a similar texture.

//           Naan can be enjoyed on its own or served alongside a variety of dishes, such as curries, kebabs, and other grilled meats. It can also be used as a base for pizza-like creations or as a sandwich wrap. Naan variations include garlic naan, cheese naan, and stuffed naan, which can be filled with ingredients such as paneer, potatoes, or meat.

//           Naan is a versatile and delicious addition to any meal, and its popularity has made it a widely available and beloved food around the world.`,
//         categoryCourse: "Other",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Levure",
//           "Sucre",
//           "Sel",
//           "Lait",
//           "Yaourt",
//           "Beurre",
//           "Oeuf",
//         ],
//         imageCourse: "nann.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Tortillas",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Tortillas are a type of thin, unleavened flatbread made from either corn or wheat flour. They are a staple food in many Latin American countries, including Mexico, where they are an essential component of many traditional dishes such as tacos, quesadillas, and enchiladas.

//           Corn tortillas are made by mixing masa harina (corn dough) with water to form a soft dough, which is then flattened into thin circles and cooked on a hot griddle or comal. Wheat tortillas are made with a similar process, using wheat flour instead of corn.

//           Tortillas can be enjoyed on their own or used as a versatile base for a wide variety of dishes. They can be filled with meats, cheese, beans, and vegetables to create delicious and satisfying tacos, burritos, and other Mexican-inspired dishes. They can also be fried or baked to create crispy chips or tostadas, which can be topped with guacamole, salsa, and other flavorful toppings.

//           Tortillas are widely available in grocery stores and can also be made at home with a few simple ingredients. They are a delicious and versatile addition to any meal and have become a beloved food around the world.
//           `,
//         categoryCourse: "Other",
//         caloriesCourse: 400,
//         ingredientsCourse: [
//           "Farine T65",
//           "Sel",
//           "Levure chimique",
//           "Eau",
//           "Huile végétale",
//         ],
//         imageCourse: "tortillas.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//       {
//         nameCourse: "Dumpings",
//         dateCourse: "2023-03-08",
//         timeCourse: "14:30",
//         addressCourse:
//           "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
//         descriptionCourse: `Dumplings are a type of filled dough that are boiled, steamed, or fried, and are a popular food in many cultures around the world. They can be sweet or savory and can be filled with a variety of ingredients, such as meats, vegetables, cheese, or fruits.

//           In Chinese cuisine, dumplings are known as "jiaozi" and are often served during the Chinese New Year as a symbol of wealth and good fortune. They are typically filled with pork or chicken, vegetables, and seasonings and are boiled or steamed.

//           In Japanese cuisine, dumplings are called "gyoza" and are usually filled with pork and cabbage and are fried or steamed. In Korean cuisine, dumplings are called "mandu" and are filled with pork, beef, tofu, or vegetables and are often served in soups or fried.

//           Dumplings are also popular in Eastern European cuisines, such as pierogi in Poland, pelmeni in Russia, and vareniki in Ukraine. These dumplings are usually filled with potatoes, cheese, or meats and are boiled or fried.

//           Dumplings are a versatile and delicious food that can be enjoyed as a snack, appetizer, or main course. They can be served in a variety of ways, such as in soups, stews, or on their own with dipping sauces. Dumplings are a beloved food around the world and have a rich history and cultural significance in many countries.`,
//         categoryCourse: "Other",
//         caloriesCourse: 400,
//         ingredientsCourse: ["Farine T65", "Eau", "Sel"],
//         imageCourse: "tortillas.jpg",
//         instructorCourse: {
//           _id: "6408d89aaf9308838ec8e85a",
//         },
//         studentsCourse: ["123456"],
//       },
//     ]);
//   } catch (error) {
//     console.log("err", error);
//   }
// }

// insertDymmyRecipeData();

// category
// async function insertDymmyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         nameCategory: "Bakery",
//         imageCategory: "bakery.jpg",
//         iconCategory: `<iconify-icon icon="mdi:bread" class="icon_title_display"></iconify-icon>`,
//       },
//       {
//         nameCategory: "Pastry",
//         imageCategory: "pastry.jpg",
//         iconCategory: `<iconify-icon icon="mdi:food-croissant" class="icon_title_display"></iconify-icon>`,
//       },
//       {
//         nameCategory: "Other",
//         imageCategory: "other.jpg",
//         iconCategory: `<iconify-icon icon="ion:pizza" class="icon_title_display"></iconify-icon>`,
//       },
//       {
//         nameCategory: "All",
//         imageCategory: "view_all.jpg",
//         iconCategory: `<i class="uil uil-book-alt icon_title_display"></i>`,
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyCategoryData();
