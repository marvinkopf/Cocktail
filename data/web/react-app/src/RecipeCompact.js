import recipe from "./Recipe"
import "./RecipeCompact.css";

function RecipeCompactComponent(props) {
    let recipe = props.recipe;
  return (
    <div className="recipe-compact">
        <div className="recipe-compact-column1">{props.recipe.name}</div>
        <div className="recipe-compact-column2"> {recipe.ingredients.map((ingredient, index, list) => {
            if (index === list.length - 1)
                return " " + ingredient.name;
            else if(index === 0)
                return ingredient.name;
            else
                return " " +ingredient.name + ",";

        })}</div>

    </div>
  );
}

export default RecipeCompactComponent;
