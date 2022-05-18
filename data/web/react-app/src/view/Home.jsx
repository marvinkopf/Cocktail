import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getRandomCocktails } from "../models/cocktails";

export default function Home() {
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    getRandomCocktails(3).then((drinks) => setCocktails(drinks));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = e.target.elements.searchtext.value;

    if (searchText.length > 0) {
      navigate(`/cocktails?search=${searchText}`);
    }
  };

  return (
    <div className="home">
      <form className="searchbar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Finde deinen Cocktail"
          name="searchtext"
        />
        <button>Suche</button>
      </form>

      <div className="party-buttons">
        <Link to="/party/create">Party Erstellen</Link>
        <Link to="/party/join">Party Beitreten</Link>
      </div>

      <div className="cocktail-showcase">
        {cocktails.map((cocktail) => (
          <Card key={cocktail.id} details={cocktail} />
        ))}
      </div>
    </div>
  );
}
