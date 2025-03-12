import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import showContextMenu from "../showContextMenu";
import donutPile from "../assets/images/donut-pile.jpg";

function showTargetingBox(e) {
  const targetingBox = document.getElementById("targeting-box");

  // prettier-ignore
  // Move targeting box to its new left position:
  targetingBox.style.left = `${e.clientX - (targetingBox.clientWidth / 2)}px`;

  // prettier-ignore
  // Move targeting box to its new top position:
  targetingBox.style.top = `${e.clientY - (targetingBox.clientHeight / 2)}px`;

  // Remove 'invisible' class from the previously active targeting box:
  targetingBox.classList.remove("invisible");

  // Add 'visible' class to the new targeting box:
  targetingBox.classList.add("visible");
}

function hideTargetingBox() {
  const targetingBox = document.getElementById("targeting-box");
  targetingBox.classList.remove("visible");
  targetingBox.classList.add("invisible");
}

export default function GameElements() {
  const contextMenuRef = useRef(null);

  function showContextMenuAtClickedSpot(e) {
    const isLeftMouseDown = e.button === 0;
    if (isLeftMouseDown) {
      showContextMenu(e);
      showTargetingBox(e);
    }
  }

  function hideContextMenu(e) {
    e.preventDefault();
    hideTargetingBox();
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
  }

  return (
    <>
      <ContextMenu ref={contextMenuRef} />
      <div
        id="targeting-box"
        className="fixed z-30 size-10 bg-red-500/50 border-4 border-red-950 border-dashed rounded-full invisible"
      ></div>
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
