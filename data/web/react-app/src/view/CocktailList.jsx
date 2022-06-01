import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import { getCocktailList } from "../models/cocktails";

export default function CocktailList() {
  const [cocktails, setCocktails] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  useEffect(() => {
    getCocktailList(searchText).then(setCocktails);
  }, [searchText]);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = e.target.elements.searchtext.value;
    setSearchParams({ search: searchText });
  };

  return (
    <div className="cocktail-list">
      <form className="searchbar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Finde deinen Cocktail"
          name="searchtext"
          defaultValue={searchText}
        />
        <button>Suche</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cocktails.map((cocktail) => (
            <tr key={cocktail.id}>
              <td>{cocktail.name}</td>
              <td>{cocktail.ingredients.join(", ")}</td>
              <td>
                <Link to={`./${cocktail.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2em",
          justifyContent: "center",
        }}
      >
        {cocktails.map((cocktail) => (
          <Card details={cocktail} />
        ))}
      </div>
    </div>
  );
}
