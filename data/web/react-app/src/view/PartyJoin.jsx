export default function PartyJoin() {
  const handleScanQr = (e) => {
    navigator.mediaDevices.getUserMedia({ video: true });
  };

  return (
    <div>
      <h1>Einer Party Beitreten</h1>

      <div>
        Benutze eine PIN
        <input type="text" />
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
