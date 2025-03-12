import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import showContextMenu from "../showContextMenu";
import donutPile from "../assets/images/donut-pile.jpg";

export default function GameImage() {
  const contextMenuRef = useRef(null);

  function showContextMenuAtClickedSpot(e) {
    const isLeftMouseDown = e.button === 0;
    isLeftMouseDown && showContextMenu(e);
  }

  function hideContextMenu(e) {
    e.preventDefault();
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
  }

  return (
    <>
      <ContextMenu ref={contextMenuRef} />
      <img
        onMouseDown={showContextMenuAtClickedSpot}
        onContextMenu={hideContextMenu}
        src={donutPile.src}
        alt="Donut pile"
        width={"100%"}
      />
    </>
  );
}
