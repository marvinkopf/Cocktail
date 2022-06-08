import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRoom } from "../models/room";

export default function PartyCreate() {
    const [input, setInput]  = useState("");
    const navigate = useNavigate();
    
  function handleChange(event)
      {
          setInput(event.target.value);
      }
      
      function handleClick(event) {
          createRoom(input).then(res => res.json()).then(res => navigate("/party/"+res.id));
        
      }
    return <><input value={input} onChange={handleChange} type="text" />
        <input type="button" onClick={handleClick} value="Enter"/></>;
}