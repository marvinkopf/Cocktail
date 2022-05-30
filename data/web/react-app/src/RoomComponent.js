import RecipeCompactComponent from "./RecipeCompact";
import AddIngComponent from "./AddIng"
import { useParams} from "react-router-dom";
import React from "react";

function RoomComponent(props) {
    const { id } = useParams()
    const [room1, setRoom] = React.useState({});
    const [showAddingIng, setAddingIng] = React.useState(false);

    /* https://stackoverflow.com/a/66186184 */
    const [state, setState] = React.useState('');

    React.useEffect(() => {fetch("http://localhost:3000/rooms/"+id)
      .then(res => res.json())
      .then(
        (result) => {
            setRoom(result);
        }
      );}, []);

    function addIng() {
        setAddingIng(true);
    }

    function removeFromArray(array, object) {
        /* https://stackoverflow.com/a/3954451 */
        let index = array.indexOf(object);
        if (index !== -1) {
          array.splice(index, 1);
        }
    }

    function removeIng(ing) {
        removeFromArray(room1.ingredients, ing);
        setState(Math.random());
        fetch("http://localhost:3000/rooms/"+room1.id, {
            method: "PUT",
            body: JSON.stringify(room1),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                alert("There was an error");
            }
            else {
            }}).catch(res => alert("Error!"));
    }
  return (<div>{showAddingIng && <AddIngComponent addIngChanger={setAddingIng} stateChanger={setState} room={room1}/>}
    <div className="container">
          <div className="room-name">Raum:<br></br>
              <div className="room-name-box"> {room1.name}</div>
      </div>
          <div className="room-id">ID: {room1.id}</div>
          <div className="ingredients-header">Ingredients
              <button  onClick={addIng} className="ingredient-add-button">ADD</button>
          </div>
          <div className="recipes-header">Cocktail Recipes</div>
          <div className="ingredients">
              <ul>
                  {room1.ingredients?.map((ing) =>
                      <li id={ing.id}>{ing.name}
                        <button onClick={() => removeIng(ing)} className="ingredient-remove-button">DELETE</button>
                      </li>)}
              </ul>
          </div>
          <div className="recipes">
              <div className="recipes-container">
                  <div className="left-header">Name</div>
                  <div className="right-header">Ingredients</div>
                  {room1.recipes?.map((rec) =><RecipeCompactComponent recipe={rec} />)}
          </div>
          </div></div></div>
  );
}

export default RoomComponent;