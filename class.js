// courses
async function insertDymmyRecipeData() {
  try {
    await Course.insertMany([
      {
        nameCourse: "Baguette",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "4 Rue Bonaparte, 20000 Ajaccio, Corse-du-Sud, France",
        descriptionCourse: `La baguette est un type de pain français emblématique, reconnaissable à sa forme allongée et fine. Elle est fabriquée à partir d'une pâte simple composée de farine, d'eau, de sel et de levure, et est cuite à haute température pour obtenir une croûte croustillante et dorée. La baguette est un aliment de base dans la cuisine française et est souvent consommée au petit-déjeuner, au déjeuner ou au dîner. Elle est idéale pour accompagner une grande variété de plats, comme les fromages, les charcuteries et les soupes. La baguette est également un symbole culturel de la France, appréciée dans le monde entier pour son goût et sa texture uniques.`,
        categoryCourse: {
          _id: "642b25e9e4f201d77621c6bc",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Eau",
          "Sel",
          "Levure",
          "Levain",
          "Bassinage",
        ],
        imageCourse: ["baguette.png", "baguette_R.png"],
        instructorCourse: {
          _id: "6446f6df1f2da5e321045877",
        },
      },
      {
        nameCourse: "Pain de mie",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "47 Rue Devosge, 21000 Dijon, Côte-d'Or, France",
        descriptionCourse:
          "Le pain de mie est un pain blanc tranché à mie serrée, très utilisé pour les sandwichs et les toasts. Il est préparé à partir d'une pâte levée, qui est cuite dans une boîte à pain spéciale pour donner sa forme caractéristique. Le pain de mie est souvent plus doux et plus léger que les autres pains et peut être consommé grillé, beurré ou garni de divers ingrédients. Il est également couramment utilisé pour la préparation de plats tels que le pain perdu, les croûtons ou les croûtons. Sa texture moelleuse et sa forme régulière en font un choix populaire pour les sandwichs, en particulier dans les pays anglo-saxons.",
        categoryCourse: {
          _id: "642b25e9e4f201d77621c6bc",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine de force",
          "Sucre",
          "Sel",
          "Levure",
          "Poudre de lait",
          "Eau",
          "Beurre",
        ],
        imageCourse: ["pain_de_mie.png", "pain_de_mie_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e321045879",
        },
      },
      {
        nameCourse: "Pain au levain",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "1 Rue Pradier, 75019 Paris, Paris, France",
        descriptionCourse: `Le pain au levain est un pain fabriqué à partir d'une pâte fermentée naturellement avec un levain, plutôt que d'une levure commerciale. Cette méthode traditionnelle donne au pain une saveur légèrement acidulée et une texture plus dense et mâchée. Le levain est créé en mélangeant de la farine et de l'eau, puis en laissant fermenter naturellement pendant plusieurs jours, ce qui permet aux levures et aux bactéries naturellement présentes dans l'air et sur les grains de se développer. Le pain au levain est souvent considéré comme plus sain que le pain commercial, car il contient des nutriments plus nombreux et est plus facilement digéré. Il est apprécié pour sa saveur complexe et son aspect rustique.`,
        categoryCourse: {
          _id: "642b25e9e4f201d77621c6bc",
        },
        caloriesCourse: 400,
        ingredientsCourse: ["Farine T65", "Eau", "Sel", "Levain"],
        imageCourse: ["pain_au_levain.png", "pain_au_levain_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587b",
        },
      },
      {
        nameCourse: "Nordika",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
        descriptionCourse: `Nordika est un type de pain originaire de Scandinavie et désormais apprécié dans de nombreuses régions du monde. C'est un pain dense et sombre fait de farine de seigle et contenant souvent d'autres grains et graines tels que des graines de tournesol et de lin. Nordika est un pain consistant, riche en fibres, en protéines et autres nutriments. La pâte à pain pour Nordika est généralement préparée avec un levain naturel, ce qui contribue à la saveur distincte du pain et améliore sa durée de conservation. La pâte est laissée fermenter pendant plusieurs heures, voire plusieurs jours, ce qui contribue à la texture dense et à la saveur acidulée du pain. Nordika est souvent coupé en fines tranches et utilisé comme base pour les sandwichs ouverts, connus sous le nom de smørrebrød en Scandinavie. Il est également délicieux grillé et servi avec du beurre et de la confiture ou utilisé comme base consistante pour le toast à l'avocat. Nordika est un choix populaire pour ceux qui cherchent un pain savoureux et riche en nutriments qui est à la fois délicieux et satisfaisant.`,
        categoryCourse: {
          _id: "642b25e9e4f201d77621c6bc",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T80",
          "Farine Nordika",
          "Eau",
          "Sel",
          "Levure",
          "Levain",
        ],
        imageCourse: ["nordika.png", "nordika_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587c",
        },
      },
      {
        nameCourse: "Pain au khorazan",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "4 Rue Bonaparte, 20000 Ajaccio, Corse-du-Sud, France",
        descriptionCourse: `Le Pain au Khorazan est un type de pain français fait avec de la farine de khorazan, une variété ancienne de blé d'origine iranienne. Cette farine est riche en nutriments, en fibres et en saveurs, et donne une texture moelleuse et une saveur noisette au pain. Le pain au Khorazan est souvent associé à une alimentation saine et équilibrée, car il est plus facilement digestible que les pains traditionnels. Il est parfait pour accompagner une grande variété de plats, ou simplement pour être dégusté avec du beurre ou de la confiture. Le pain au Khorazan est de plus en plus populaire dans les boulangeries et les restaurants, en raison de ses qualités nutritives et gustatives uniques.`,
        categoryCourse: {
          _id: "642b25e9e4f201d77621c6bc",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine Khorazan",
          "Eau",
          "Sel",
          "Levure",
          "Levain",
          "Bassinage",
          "Graines",
          "Hydra Graines",
        ],
        imageCourse: ["pain_au_khorazan.png", "pain_au_khorazan_R.png"],
        instructorCourse: {
          _id: "6446f6df1f2da5e321045877",
        },
      },
      {
        nameCourse: "Croissant",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "1 Quai Eugene Meslin, 14000 Caen, Calvados, France",
        descriptionCourse:
          "Le croissant est une pâtisserie d'origine autrichienne, mais qui est devenue emblématique de la France. Cette viennoiserie en forme de croissant de lune est composée de pâte feuilletée légère et croustillante, et est traditionnellement servie au petit-déjeuner ou au brunch. Le croissant est souvent accompagné de beurre, de confiture ou de miel, et se marie parfaitement avec un café ou un thé. Sa fabrication nécessite un savoir-faire particulier, incluant de nombreux tours de pâte pour créer les fines couches de feuilletage. Le croissant est un symbole de la culture française et est apprécié dans le monde entier pour sa texture croustillante et son goût délicieux.",
        categoryCourse: {
          _id: "642b25f3e4f201d77621c6bd",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Sucre",
          "Sel",
          "Levure",
          "Beurre",
          "Lait",
          "Eau",
        ],
        imageCourse: ["croissant.png", "croissant_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587e",
        },
      },
      {
        nameCourse: "Pain au chocolate",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "149 Rue Anatole France, 92300 Levallois-Perret, Hauts-de-Seine, France",
        descriptionCourse:
          "Le pain au chocolat est une viennoiserie française, composée d'une pâte feuilletée croustillante et d'une barre de chocolat fondant en son centre. C'est une pâtisserie populaire en France, souvent consommée au petit-déjeuner ou au goûter, accompagnée d'un café ou d'un chocolat chaud. Le pain au chocolat est apprécié pour sa texture légère et feuilletée, ainsi que pour la générosité de sa garniture chocolatée. Il peut être consommé chaud ou froid, et est souvent présenté en forme de croissant allongé. Le pain au chocolat est un classique de la boulangerie française, qui est apprécié dans le monde entier.",
        categoryCourse: {
          _id: "642b25f3e4f201d77621c6bd",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Sucre",
          "Sel",
          "Levure",
          "Beurre",
          "Lait",
          "Eau",
          "Oeuf",
          "Chocolate",
        ],
        imageCourse: ["pain_au_chocolate.png", "pain_au_chocolate_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587d",
        },
      },
      {
        nameCourse: "Pain au raisins",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "14 Rue Paul Louis Lande, 33000 Bordeaux, Gironde, France",
        descriptionCourse: `Le pain au raisin est une viennoiserie française, qui se compose d'une pâte levée feuilletée garnie de crème pâtissière et de raisins secs. C'est une pâtisserie généralement consommée au petit-déjeuner ou au goûter, accompagnée d'une tasse de café ou de thé. Le pain au raisin est reconnaissable à sa forme spirale et à ses raisins gonflés qui se détachent joliment sur sa surface dorée. Sa pâte feuilletée croustillante et sa garniture douce et crémeuse font de cette viennoiserie un vrai délice pour les amateurs de pâtisseries. Le pain au raisin est un classique de la boulangerie française, qui reste très apprécié aujourd'hui.`,
        categoryCourse: {
          _id: "642b25f3e4f201d77621c6bd",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Sucre",
          "Sel",
          "Levure",
          "Beurre",
          "Lait",
          "Eau",
          "Oeuf",
          "raisins",
          "sucre marron",
          "canelle",
          "muscade",
        ],
        imageCourse: ["pain_au_raisins.png", "pain_au_raisins_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587a",
        },
      },
      {
        nameCourse: "Brioche",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "25 Avenue Pierre Beregovoy, 58000 Nevers, Nièvre, France",
        descriptionCourse: `La brioche est une viennoiserie française, moelleuse et délicieusement parfumée, qui est souvent consommée au petit-déjeuner ou au goûter. Elle est faite à partir d'une pâte levée riche en beurre, en œufs et en sucre, qui lui donne une texture tendre et fondante en bouche. La brioche peut être aromatisée avec des ingrédients tels que la vanille, le zeste d'orange ou le rhum, pour ajouter de la saveur. Elle peut être dégustée telle quelle ou toastée et tartinée de confiture ou de pâte à tartiner. La brioche est une pâtisserie incontournable de la tradition française, appréciée pour son goût délicat et sa texture légère.`,
        categoryCourse: {
          _id: "642b25f3e4f201d77621c6bd",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine de force",
          "Oeufs",
          "Sel",
          "Levure",
          "Sucre",
          "Beurre",
        ],
        imageCourse: ["brioche.png", "brioche_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e321045878",
        },
      },
      {
        nameCourse: "Brioche au sucre",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "9 Rue du Pilori, 64100 Bayonne, Pyrénées-Atlantiques, France",
        descriptionCourse: `La brioche au sucre est une pâtisserie française, moelleuse et légèrement sucrée, qui est souvent consommée au petit-déjeuner ou au goûter. Elle est faite à partir d'une pâte levée riche en beurre, qui lui donne une texture tendre et fondante en bouche. La brioche est traditionnellement saupoudrée de sucre en grains avant d'être cuite au four, ce qui lui confère une croûte croustillante et dorée. Elle peut être dégustée telle quelle ou agrémentée de confiture, de pâte à tartiner ou de fruits frais. La brioche au sucre est une pâtisserie délicieuse et réconfortante, qui incarne parfaitement la tradition française de la boulangerie.`,
        categoryCourse: {
          _id: "642b25f3e4f201d77621c6bd",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine de force",
          "Oeufs",
          "Sel",
          "Levure",
          "Sucre",
          "Beurre",
        ],
        imageCourse: ["brioche_au_sucre.png", "brioche_au_sucre_R.png"],
        instructorCourse: {
          _id: "6446f6df1f2da5e321045876",
        },
      },
      {
        nameCourse: "Pizza",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "47 Rue Devosge, 21000 Dijon, Côte-d'Or, France",
        descriptionCourse: `La pizza est un plat italien emblématique, composé d'une pâte à pizza recouverte de sauce tomate et garnie de divers ingrédients, tels que du fromage, de la viande, des légumes ou des herbes aromatiques. La pizza est cuite au four et peut être dégustée chaude ou froide. Elle est souvent considérée comme un plat convivial à partager entre amis ou en famille. La pizza a connu une grande popularité dans le monde entier et il existe aujourd'hui de nombreuses variantes de ce plat traditionnel italien.`,
        categoryCourse: {
          _id: "642b25fbe4f201d77621c6be",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Farine de seigle noire",
          "Eau",
          "Huile d’olive",
          "Oeufs",
          "Levure",
          "Sel",
        ],
        imageCourse: ["pizza.png", "pizza_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e321045879",
        },
      },
      {
        nameCourse: "Gua Bao",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "Rue du Caducee, 34090 Montpellier, Hérault, France",
        descriptionCourse: `Le gua bao est un petit pain taïwanais cuit à la vapeur et farci de viande de porc braisée, de légumes et d'herbes aromatiques. Sa texture moelleuse et légère en fait une option de street food populaire dans de nombreux pays asiatiques. On le trouve souvent sous forme de sandwich, avec le pain ouvert en deux pour accueillir les garnitures savoureuses. Le gua bao est également souvent accompagné de sauces sucrées et salées pour ajouter une touche de saveur supplémentaire.`,
        categoryCourse: {
          _id: "642b25fbe4f201d77621c6be",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Lait",
          "Sucre",
          "Levure",
          "Sel",
          "Levure chimique",
          "Eau",
        ],
        imageCourse: ["gua_bao.png", "gua_bao_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587f",
        },
      },
      {
        nameCourse: "Nann",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "1 Rue Pradier, 75019 Paris, Paris, France",
        descriptionCourse: `Le pain naan est un pain traditionnel originaire d'Asie centrale et du sud. C'est un pain plat et rond, cuit au four tandoor, qui peut être dégusté nature, aromatisé ou fourré. Il est souvent utilisé pour accompagner des plats indiens ou moyen-orientaux tels que les curry, les tandoori et les kebabs. La pâte est généralement faite avec de la farine de blé, du yaourt et de la levure, ce qui donne une texture légèrement moelleuse et aérée. Le pain naan peut également être garni de fromage, d'oignons ou d'autres ingrédients avant d'être cuit pour créer des variantes savoureuses.`,
        categoryCourse: {
          _id: "642b25fbe4f201d77621c6be",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Levure",
          "Sucre",
          "Sel",
          "Lait",
          "Yaourt",
          "Beurre",
          "Oeuf",
        ],
        imageCourse: ["nann.png", "nann_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587b",
        },
      },
      {
        nameCourse: "Tortillas",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse:
          "14 Rue Saint-Denis, 92700 Colombes, Hauts-de-Seine, France",
        descriptionCourse: `La tortilla est un plat traditionnel de la cuisine mexicaine, qui se présente sous forme d'une galette plate faite de maïs ou de farine de blé. Elle est généralement utilisée comme base pour des plats tels que les tacos, les enchiladas ou les quesadillas, et peut être garnie avec une variété d'ingrédients tels que de la viande, des légumes, du fromage et des sauces. La tortilla est souvent considérée comme un aliment de base dans la cuisine mexicaine et peut être consommée à tout moment de la journée, que ce soit pour le petit déjeuner, le déjeuner ou le dîner. Elle est également devenue populaire dans le monde entier en tant que plat savoureux et facile à préparer.
          `,
        categoryCourse: {
          _id: "642b25fbe4f201d77621c6be",
        },
        caloriesCourse: 400,
        ingredientsCourse: [
          "Farine T65",
          "Sel",
          "Levure chimique",
          "Eau",
          "Huile végétale",
        ],
        imageCourse: ["tortillas.png", "tortillas_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587c",
        },
      },
      {
        nameCourse: "Dumpings",
        dateCourse: "2023-03-08",
        timeCourse: "14:30",
        addressCourse: "Rue du Caducee, 34090 Montpellier, Hérault, France",
        descriptionCourse: `Le dumpling est un plat traditionnel de la cuisine asiatique, constitué d'une petite boulette de pâte farcie de viande, de légumes ou de fruits de mer. On le cuit généralement à la vapeur, à la poêle ou dans un bouillon. Il existe de nombreuses variantes de dumplings selon les régions d'Asie, les ingrédients et les méthodes de cuisson utilisées. Les dumplings peuvent être dégustés en apéritif, en plat principal ou en collation. Ils sont souvent accompagnés d'une sauce soja, d'une sauce aigre-douce ou d'une sauce pimentée pour leur donner plus de saveur.`,
        categoryCourse: {
          _id: "642b25fbe4f201d77621c6be",
        },
        caloriesCourse: 400,
        ingredientsCourse: ["Farine T65", "Eau", "Sel"],
        imageCourse: ["dumping.png", "dumping_R.png"],
        instructorCourse: {
          _id: "6446f6e01f2da5e32104587f",
        },
      },
    ]);
  } catch (error) {
    console.log("err", error);
  }
}

insertDymmyRecipeData();

// category;
// async function insertDymmyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         nameCategory: "Bakery",
//         imageCategory: "bakery.jpg",
//         iconCategory: `<iconify-icon icon="mdi:bread"></iconify-icon>`,
//       },
//       {
//         nameCategory: "Pastry",
//         imageCategory: "pastry.jpg",
//         iconCategory: `<iconify-icon icon="mdi:food-croissant"></iconify-icon>`,
//       },
//       {
//         nameCategory: "Other",
//         imageCategory: "other.jpg",
//         iconCategory: `<iconify-icon icon="ion:pizza"></iconify-icon>`,
//       },
//       {
//         nameCategory: "All",
//         imageCategory: "view_all.jpg",
//         iconCategory: `<i class="uil uil-book-alt"></i>`,
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyCategoryData();

// user;
async function insertDymmyCategoryData() {
  try {
    await User.insertMany([
      {
        firstnameUser: "Auguste",
        lastnameUser: "Lefebvre",
        themeColorUser: "#b3b3b3",
        fathUser: "Cuisiner est une manière de démontrer notre amour.",
        emailUser: "augustelefebvre@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m’appelle Auguste. Je travaille dans la pâtisserie depuis 3 ans. Depuis tout jeune, j'ai toujours été passionné par la cuisine et surtout par la pâtisserie. Après avoir terminé mes études dans l’art culinaire, j’ai décidé de poursuivre mon rêve de devenir pâtissier. C’est un métier qui demande beaucoup d’innovation afin de créer de nouvelles recettes pour nos clients. J’adore me dépasser et faire de mon mieux pour satisfaire tout le monde. Ma spécialité sont les brioches au sucre  mais j’aimerais beaucoup m’améliorer pour pouvoir faire d'autres pâtisseries plus complexes.",
        imageUser: ["Auguste_Lefebvre.png", "Auguste_Lefebvre_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Christine",
        lastnameUser: "Leconte",
        themeColorUser: "#36495C",
        fathUser: "Notre but : faire sourire à chaque bouchée.",
        emailUser: "christineleconte@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Issu d'une famille de boulangers, j’ai commencé à travailler dans la boulangerie familiale dès mon plus jeune âge. J’ai  perfectionné mes compétences au fil des ans en apprenant les techniques traditionnelles de boulangerie, en utilisant uniquement les meilleurs ingrédients et en expérimentant de nouvelles saveurs.",
        imageUser: ["Christine_Leconte.png", "Christine_Leconte_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Claudine",
        lastnameUser: "Lefort",
        themeColorUser: "#ff0066",
        fathUser: "La pâtisserie transforme tout en émotions.",
        emailUser: "claudinelefort@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m'appelle Claudine. J'ai travaillé dans différents environnements, que ce soit des petites boulangeries familiales aux grandes cuisines commerciales, et j'ai créé de délicieuses et magnifiques pâtisseries. Je suis fière d'utiliser uniquement les meilleurs ingrédients dans ma pâtisserie, en privilégiant les sources locales dès que je peux, et j'aime expérimenter de nouveaux arômes et techniques pour créer des produits de boulangerie uniques et innovants.",
        imageUser: ["Claudine_Lefort.png", "Claudine_Lefort_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Emmanuel",
        lastnameUser: "Brunel",
        themeColorUser: "#dca47d",
        fathUser: "La boulangerie rend la vie plus douce.",
        emailUser: "emmanuelbrunel@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Connu pour mes créations incroyablement délicieuses et esthétiquement belles. Je suis spécialisé dans la création de pains artisanaux complexes pour les occasions spéciales. Mes créations sont souvent présentées dans des magazines culinaires prestigieux et je suis régulièrement invité à participer à des émissions de télévision et des conférences sur la boulangerie dans le monde entier.",
        imageUser: ["Emmanuel_Brunel.png", "Emmanuel_Brunel_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Joséphine",
        lastnameUser: "Fabre",
        themeColorUser: "#d3be4a",
        fathUser: "La pâtisserie, c'est ma passion sucrée.",
        emailUser: "joséphinefabre@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m'appelle Joséphine. C'est ma 10ème année en tant que pâtissière. Mes spécialités comprennent les pâtisseries  et les gâteaux personnalisés pour les occasions spéciales. J’ai déjà fait plusieurs pièces montées pour des mariages, ou des gâteaux pour des anniversaires. Je suis connue pour mon souci du détail et ma capacité à créer de beaux et délicieux desserts qui laissent une impression durable sur mes clients.",
        imageUser: ["Joséphine_Fabret.png", "Joséphine_Fabret_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Sophie",
        lastnameUser: "Ferrand",
        themeColorUser: "#e39d0d",
        fathUser: "La pâtisserie m'a appris à relever les défis.",
        emailUser: "sophieferrand@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m’appelle Sophie. Ayant travaillé pendant des années à l’étranger, je travaille aujourd’hui  dans ma boulangerie, située dans la campagne française, où je continue d'innover et de créer des chefs-d'œuvre culinaires qui ravissent les papilles de mes clients fidèles.",
        imageUser: ["Sophie_Ferrand.png", "Sophie_Ferrand_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Sébastien",
        lastnameUser: "Paul",
        themeColorUser: "#6e1d0e",
        fathUser: "La boulangerie rend la vie savoureuse.",
        emailUser: "sébastienpaul@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je suis un jeune boulanger passionné qui vient de rejoindre l'industrie de la boulangerie. Bien que je sois nouveau dans le métier, j’essaie de faire preuve d'un grand talent et d'une grande créativité dans la création de pains délicieux. Après avoir obtenu mon diplôme en arts culinaires, j’ai commencé mon apprentissage auprès de boulangers expérimentés pour parfaire mes compétences. Je suis toujours à la recherche de nouvelles techniques et de nouvelles saveurs pour créer des créations innovantes.",
        imageUser: ["Sébastien_Paul.png", "Sébastien_Paul_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Élise",
        lastnameUser: "Maillot",
        themeColorUser: "#627e65",
        fathUser: "La pâtisserie c'est créer du bonheur à partager.",
        emailUser: "elisemaillot@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m'appelle Elise. Je travaille comme pâtissière depuis 2 ans. Pendant mon temps libre, j'aime explorer de nouvelles recettes, assister à des conférences et des compétitions de pâtisserie, et partager ma passion pour la pâtisserie avec les autres. J'espère ouvrir un jour ma propre pâtisserie, où je pourrai continuer à créer des recettes délicieuses et originales pendant de nombreuses années. J’ai déjà appris tant de choses durant mon apprentissage et j’ai toujours été très bien entourée. J’espère transmettre un peu de ma passion à travers ce que je crée.",
        imageUser: ["Élise_Maillot.png", "Élise_Maillot_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Lola",
        lastnameUser: "Gonzalez",
        themeColorUser: "#9F5514",
        fathUser: "Partager avec les autres, c’est si doux.",
        emailUser: "lolagonzalez@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m’appelle Lola. J’ai toujours admiré mon père qui était pâtissier et j’ai donc décidé de suivre sa passion et de devenir pâtissière à mon tour. Petite, il m’apprenait à faire des croissants et des pains au chocolat et j’adorais ça. C’est pour cela qu’après avoir passé mon CAP et mon Brevet Professionnel j’ai tout de suite trouvé une boulangerie pâtisserie qui me mettait en confiance et dans laquelle j’adore travailler et partager avec les autres.",
        imageUser: ["Lola_Gonzalez.png", "Lola_Gonzalez_R.png"],
        roleUser: "instructor",
      },
      {
        firstnameUser: "Marie",
        lastnameUser: "Curie",
        themeColorUser: "#91BCD6",
        fathUser: "L’art d’innover pour des saveurs inattendues.",
        emailUser: "mariecurie@gmail.com",
        passwordUser: "12345678",
        introductionUser:
          "Je m’appelle Marie et j’ai plus de 10 ans d'expérience en cuisine asiatique. J’utilise uniquement les meilleurs ingrédients pour créer des plats incroyablement savoureux.",
        imageUser: ["Marie_Curie.png", "Marie_Curie_R.png"],
        roleUser: "instructor",
      },
    ]);
  } catch (error) {
    console.log("err", error);
  }
}

// insertDymmyCategoryData();
