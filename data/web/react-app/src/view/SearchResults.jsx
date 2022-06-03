import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import CocktailTable from "../components/CocktailTable";
import Searchbar from "../components/Searchbar";
import { useMixbarTitle } from "../hooks/useMixbarTitle";
import { getCocktailList } from "../models/cocktails";
import CocktailListCards from "../components/CocktailListCards";

export default function SearchResults() {
  const [cocktails, setCocktails] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardView, setCardView] = useState(false);

  const searchText = searchParams.get("search");

  useMixbarTitle("Suche");

  useEffect(() => {
    getCocktailList(searchText).then(setCocktails);
  }, [searchText]);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = e.target.elements.searchtext.value;
    setSearchParams({ search: searchText });
  };

  return (
    <div className="search-results">
      <div className="searchbar-container">
        <Searchbar onSubmit={handleSearch} defaultValue={searchText} />
      </div>

      <div className="search-results-view-toggle">
        <Button
          className={!cardView ? "button--active" : ""}
          onClick={() => setCardView(false)}
        >
          Tabelle
        </Button>
        <Button
          className={cardView ? "button--active" : ""}
          onClick={() => setCardView(true)}
        >
          Karten
        </Button>
      </div>

      {cardView ? (
        <CocktailListCards cocktails={cocktails} />
      ) : (
        <div className="cocktail-table-container">
          <CocktailTable cocktails={cocktails} />
        </div>
      )}
    </div>
  );
}
