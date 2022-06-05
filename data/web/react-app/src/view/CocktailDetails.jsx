import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMixbarTitle } from "../hooks/useMixbarTitle";
import { getCocktail } from "../models/cocktails";

export default function CocktailDetails() {
  const params = useParams();
  const [showIngredients, setShowIngredients] = useState(true);
  const [cocktail, setCocktail] = useState({
    id: -1,
    name: "",
    picture: "",
    ingredients: [],
    instructions: "",
  });

  useMixbarTitle(cocktail.name);

  useEffect(() => {
    getCocktail(params.id).then(setCocktail);
  }, []);

  return (
    <div className="cocktail-details">
      <img src={cocktail.picture} alt={cocktail.name} />
      <h1>{cocktail.name}</h1>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <button onClick={() => setShowIngredients((prev) => !prev)}>
          {showIngredients ? "Hide" : "Show"}
        </button>
        <ul className={showIngredients ? "" : "hide"}>
          {cocktail.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient.amount} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <p>{cocktail.instructions}</p>
      </div>
    </div>
  );
}
