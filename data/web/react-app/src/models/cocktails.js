export function getCocktail(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((json) => {
      const drink = json.drinks[0];

      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        if (drink[`strIngredient${i}`]) {
          ingredients.push({
            name: drink[`strIngredient${i}`],
            amount: drink[`strMeasure${i}`],
          });
        }
      }

      return {
        id: drink.idDrink,
        name: drink.strDrink,
        picture: drink.strDrinkThumb,
        ingredients,
        instructions: drink.strInstructions,
      };
    });
}

export async function getRandomCocktails(num) {
  const promises = [];

  for (let i = 0; i < num; i++) {
    promises.push(
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((json) => {
          const drink = json.drinks[0];

          const ingredients = [];
          for (let i = 1; i < 16; i++) {
            if (drink[`strIngredient${i}`]) {
              ingredients.push(drink[`strIngredient${i}`]);
            }
          }

          return {
            id: drink.idDrink,
            name: drink.strDrink,
            picture: drink.strDrinkThumb,
            ingredients,
          };
        })
    );
  }

  const list = await Promise.all(promises);
  console.log(list);
  return list;
}

export function getCocktailList(searchStr = "") {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchStr}`
  )
    .then((res) => res.json())
    .then(({ drinks }) => {
      return drinks.map((drink) => {
        const ingredients = [];
        for (let i = 1; i < 16; i++) {
          if (drink[`strIngredient${i}`]) {
            ingredients.push(drink[`strIngredient${i}`]);
          }
        }

        return {
          id: drink.idDrink,
          name: drink.strDrink,
          picture: drink.strDrinkThumb,
          ingredients,
        };
      });
    });
}
