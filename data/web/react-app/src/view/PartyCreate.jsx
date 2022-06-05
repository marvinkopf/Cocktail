import { useState, useEffect } from "react";
import IngredientList from "../components/IngredientList";
import AddIngComponent from "../components/AddIng/AddIng";
import RecipeCompactComponent from "../components/RecipeCompact/RecipeCompact";
import { useParams} from "react-router-dom";
import { getRoom, removeIngFromRoom } from "../models/room";

export default function PartyCreate() {
  //const { id } = useParams()
  const id = 1;
  const [room, setRoom] = useState({});
  const [showAddingIng, setAddingIng] =useState(false);
  
    /* https://stackoverflow.com/a/66186184 */
  const [state, setState] = useState('');
  
  useEffect(() => {getRoom(id).then(result => setRoom(result))},[state])

  function removeIng(ing) {
    removeIngFromRoom(room.id, ing).then(result => setState(Math.random()));
  }
  
  return (
    <div className="party-create">
      <div className="roomdetails-container">
        <label>
          Raumname: <br /> <div className="room-name-box"> {room.name}</div>
        </label>

        <span>Raum ID: {room.id}</span>
      </div>
      <div className="ingredient-list-container">
        <h2>
          Ingredients{" "}
          <button className="ingredient-add-button" onClick={() => setAddingIng(true)}>Add</button>
        </h2>
        <IngredientList removeIng={removeIng} ingredients={room.ingredients} />
      </div>

      <div className="cocktail-list-container">
        <h2>Cocktail Recipes</h2>
         <div className="recipes">
              <div className="recipes-container">
                  <div className="left-header">Name</div>
                  <div className="right-header">Ingredients</div>
                  {room.recipes?.map((rec) =><RecipeCompactComponent key={rec.id} recipe={rec} />)}
              </div>
          </div>
      </div>

      {showAddingIng && <AddIngComponent addIngChanger={(v) => setAddingIng(v)} stateChanger={setState} room={room}/>}
    </div>
  );
}
