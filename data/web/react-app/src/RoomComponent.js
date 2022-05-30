import RecipeCompactComponent from "./RecipeCompact";
import { useParams} from "react-router-dom";
import React from "react";

function RoomComponent(props) {
    const { id } = useParams()
    const [room1, setRoom] = React.useState({});

    React.useEffect(() => {fetch("http://localhost:3000/rooms/"+id)
      .then(res => res.json())
      .then(
        (result) => {
            setRoom(result);
        }
      );}, []);
  return (
      <div className="container">
          <div className="room-name">Raum:<br></br>
              <div className="room-name-box"> {room1.name}</div>
      </div>
          <div className="room-id">ID: {room1.id}</div>
          <div className="ingredients-header">Ingredients
              <button className="ingredient-add-button">ADD</button>
          </div>
          <div className="recipes-header">Cocktail Recipes</div>
          <div className="ingredients">
              <ul>
                  {room1.ingredients?.map((ing) =>
                      <li id={ing.id}>{ing.name}
                        <button className="ingredient-remove-button">DELETE</button>
                      </li>)}
              </ul>
          </div>
          <div className="recipes">
              <div className="recipes-container">
                  <div className="left-header">Name</div>
                  <div className="right-header">Ingredients</div>
                  {room1.recipes?.map((rec) =><RecipeCompactComponent recipe={rec} />)}
          </div>
      </div></div>
  );
}

export default RoomComponent;