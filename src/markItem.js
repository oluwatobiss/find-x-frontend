export default function markItem(clickedSpot) {
  const gameArena = document.getElementById("game-arena");
  const image = document.createElement("img");
  image.setAttribute("src", "/check-lg.svg");
  image.setAttribute("alt", `${clickedSpot.itemName} check mark`);
  image.setAttribute("width", "50");
  image.setAttribute("height", "50");
  image.setAttribute("class", "absolute z-10");
  image.setAttribute(
    "style",
    `left: ${clickedSpot.itemX - 25}px; top: ${clickedSpot.itemY - 25}px`
  );
  gameArena.appendChild(image);
}
