import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMixbarTitle } from "../hooks/useMixbarTitle";
import { getRezept } from "../models/rezept";

export default function CocktailDetails() {
  const params = useParams();
  const [showIngredients, setShowIngredients] = useState(true);
  const [cocktail, setCocktail] = useState({
    id: -1,
    name: "",
    img_url: "",
    ingredients: [],
    instructions: "",
  });

  useMixbarTitle(cocktail.name);

  useEffect(() => {
    getRezept(params.id).then(setCocktail);
  }, []);

  return (
    <div className="cocktail-details">
      <img src={cocktail.img_url} alt={cocktail.name} />
      <h1>{cocktail.name}</h1>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <button onClick={() => setShowIngredients((prev) => !prev)}>
          {showIngredients ? "Hide" : "Show"}
        </button>
        <ul className={showIngredients ? "" : "hide"}>
          {cocktail.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.measure} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <p>{cocktail.instruction_en}</p>
      </div>
    </div>
  );
}
