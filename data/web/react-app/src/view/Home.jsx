import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CocktailListCards from "../components/CocktailListCards";
import Searchbar from "../components/Searchbar";
import { useMixbarTitle } from "../hooks/useMixbarTitle";
import { getRandomRezept } from "../models/rezept";

export default function Home() {
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState([]);

  useMixbarTitle("Home");

  useEffect(() => {
    getRandomRezept(3).then((drinks) => setCocktails(drinks));
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
      <div className="searchbar-container">
        <Searchbar onSubmit={handleSearch} />
      </div>

      <div className="cocktail-showcase">
        <CocktailListCards cocktails={cocktails} />
      </div>
    </div>
  );
}
