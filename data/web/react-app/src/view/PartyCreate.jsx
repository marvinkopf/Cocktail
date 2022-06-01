import { useState } from "react";
import IngredientList from "../components/IngredientList";

export default function PartyCreate() {
  const [addIngredientOpen, setAddIngredientOpen] = useState(false);

  return (
    <div className="party-create">
      <div className="roomdetails-container">
        <label>
          Raumname: <br /> <input type="text" defaultValue="Prakt2" />
        </label>

        <span>Raum ID: WT2H5B0</span>
      </div>
      <div className="ingredient-list-container">
        <h2>
          Ingredients{" "}
          <button onClick={() => setAddIngredientOpen(true)}>Add</button>
        </h2>
        <IngredientList />
      </div>

      <div className="cocktail-list-container">
        <h2>Cocktail Recipes</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Martini</td>
              <td>Gin, Dry Vermouth, Olive</td>
            </tr>
            <tr>
              <td>Manhattan</td>
              <td>
                Sweet Vermouth, Bourbon, Angostura bitters, Ice, Maraschino
                cherry, Orange peel
              </td>
            </tr>
            <tr>
              <td>Cosmopolitan</td>
              <td>Absolut Citron, Lime juice, Cointreau, Cranberry juice</td>
            </tr>
          </tbody>
        </table>
      </div>

      {addIngredientOpen ? (
        <div
          className="add-ingredient-backdrop"
          onClick={() => setAddIngredientOpen(false)}
        >
          <div className="add-ingredient-container">
            <h3>Add Ingredient</h3>
            <input type="text" />
            <button>Add</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
