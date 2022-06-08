import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function PartyJoin() {
  const [input, setInput]  = useState("");
  const handleScanQr = (e) => {
    navigator.mediaDevices.getUserMedia({ video: true });
  };

  function handleChange(event)
      {
          setInput(event.target.value);
      }
  return (
    <div>
      <h1>Einer Party Beitreten</h1>

      <div>
        Benutze eine PIN
        <input value={input} onChange={handleChange} type="text" />
        <Link to={"/party/"+input}><input type="button" value="Enter"/></Link>
      </div>
      <div>
        Oder scanne einen QR-Code
        <input type="button" value="Scan" onClick={handleScanQr} />
      </div>
    </div>
  );
}

function drawCanvas(canvas, img) {
  canvas.width = getComputedStyle(canvas).width.split("px")[0];
  canvas.height = getComputedStyle(canvas).height.split("px")[0];
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  canvas
    .getContext("2d")
    .drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    );
}
