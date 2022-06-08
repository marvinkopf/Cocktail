import React, {useState} from "react";
import { addIngToRoom } from "../../models/room"

function AddIngComponent(props) {
    const [input, setInput] = useState("");
    const room = props.room;
    const parentStateChanger = props.stateChanger;
    const addIngChanger = props.addIngChanger;
    function handleChange(event)
    {
        setInput(event.target.value);
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        addIngToRoom(room.id, input).then(res => {
            if (!res.ok)
                alert("There was an error")
            else {
                /* Update parent here */
                parentStateChanger(Math.random());

                addIngChanger(false);}}).catch(res => alert("Error!"));

        return false;
    }

    return <div>
        <div onClick={() => addIngChanger(false)} className="add-ing-overlay"/>
        <div className="add-ing-container">
            <form onSubmit={handleSubmit}>
             
                    <h3>Zutat Hinzufügen</h3> <br/>
                    <input type="text" value={input} onChange={handleChange}/>
         
                <button type="submit">Add</button>
            </form>
        </div>
    </div>
}

export default AddIngComponent;