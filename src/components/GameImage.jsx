import showContextMenu from "../showContextMenu";
import donutPile from "../assets/images/donut-pile.jpg";

function showContextMenuAtClickedSpot(e) {
  const contextMenu = document.getElementById("context-menu");
  const contextMenuIsActive = [...contextMenu.classList].includes("visible");
  const isLeftMouseDown = e.button === 0;
  isLeftMouseDown && showContextMenu(e, contextMenuIsActive);
}

export default function GameImage() {
  return (
    <img
      onMouseDown={showContextMenuAtClickedSpot}
      src={donutPile.src}
      alt="Donut pile"
      width={"100%"}
    />
  );
}
