import "./AddIng.css"
import React, {useState} from "react";

function AddIngComponent(props) {
    const [input, setInput] = useState();
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

        /* https://stackoverflow.com/a/728694 */
        /* in case the fetch fails, operate on a clone */
        const clone = structuredClone(room);
        clone.ingredients.push({"name":input});

        fetch("http://localhost:3000/rooms/"+room.id, {
            method: "PUT",
            body: JSON.stringify(clone),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok)
                alert("There was an error")
            else {
                /* Update parent here */
                room.ingredients.push({"name":input});
                parentStateChanger(Math.random());

                addIngChanger(false);}}).catch(res => alert("Error!"));

        return false;
    }

    return <div>
        <div onClick={() => addIngChanger(false)} className="add-ing-overlay"/>
        <div className="add-ing">
            <form onSubmit={handleSubmit}>
                <label>
                    Zutat Hinzufügen<br/>
                    <input type="text" value={input} onChange={handleChange}/>
                </label>
                <input type="submit" value="Add"/>
            </form>
        </div>
    </div>
}

export default AddIngComponent;