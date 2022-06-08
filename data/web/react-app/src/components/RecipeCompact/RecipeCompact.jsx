import "./RecipeCompact.css";
import { Link } from "react-router-dom";
import CocktailRow from "../CocktailTable/CocktailRow";
import { getZutat, getZutatenFromIdArray  } from "../../models/zutat"
import { useState } from "react"

function RecipeCompactComponent(props) {
    let recipe = props.recipe;
  return (
      <Link className="cocktail-table-row" to={`/cocktails/${recipe.id}`}>
      <div>{recipe.name}</div>
      <div>{recipe.ingredients?.map((ingredient) => ingredient.name).join(', ')}</div>
    </Link>
  );
}

export default RecipeCompactComponent;
