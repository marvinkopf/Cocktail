import "./CocktailTable.css";
import CocktailRow from "./CocktailRow";

export default function CocktailTable({ cocktails }) {
  return (
    <div className="cocktail-table">
      <div className="cocktail-table-header">
        <div>Name</div>
        <div>Zutaten</div>
      </div>
      {cocktails.map((cocktail) => (
        <CocktailRow key={cocktail.id} details={cocktail} />
      ))}
    </div>
  );
}
