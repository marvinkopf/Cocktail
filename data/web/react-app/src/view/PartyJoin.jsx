import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function PartyJoin() {
  const [input, setInput]  = useState("");

  function handleChange(event)
      {
          setInput(event.target.value);
      }

  return (
    <div
      style={{
        width: "50em",
        marginInline: "auto",
      }}
    >
      <h1>Einer Party Beitreten</h1>

      <div>
        Benutze eine PIN
        <input value={input} onChange={handleChange} type="text" />
        <Link to={"/party/"+input}><input type="button" value="Enter"/></Link>
      </div>
    </div>
  );
}
