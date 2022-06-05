import { Link } from "react-router-dom";

export default function CocktailRow({ details }) {
  return (
    <Link className="cocktail-table-row" to={`./${details.id}`}>
      <div>{details.name}</div>
      <div>{details.ingredients.join(", ")}</div>
    </Link>
  );
}
