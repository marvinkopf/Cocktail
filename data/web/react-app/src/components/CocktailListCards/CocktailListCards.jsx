import "./CocktailListCards.css";
import Card from "../Card";

export default function CocktailListCards({ cocktails }) {
  return (
    <div className="cocktail-list-cards">
      {cocktails.map((cocktail) => (
        <Card key={cocktail.id} details={cocktail} />
      ))}
    </div>
  );
}
