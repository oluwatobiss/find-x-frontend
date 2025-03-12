import showContextMenu from "../showContextMenu";
import donutPile from "../assets/images/donut-pile.jpg";

function hideContextMenu(e) {
  e.preventDefault();
  const contextMenu = document.getElementById("context-menu");
  contextMenu.classList.remove("visible");
  contextMenu.classList.add("invisible");
}

export default function GameImage() {
  function showContextMenuAtClickedSpot(e) {
    const isLeftMouseDown = e.button === 0;
    isLeftMouseDown && showContextMenu(e);
  }
  return (
    <img
      onMouseDown={showContextMenuAtClickedSpot}
      onContextMenu={hideContextMenu}
      src={donutPile.src}
      alt="Donut pile"
      width={"100%"}
    />
  );
}
