import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import showContextMenu from "../showContextMenu";
import donutPile from "../assets/images/donut-pile.jpg";

export default function GameElements() {
  const contextMenuRef = useRef(null);
  const targetingBoxRef = useRef(null);

  function showTargetingBox(e) {
    // prettier-ignore
    // Move targeting box to its new left position:
    targetingBoxRef.current.style.left = `${e.clientX - (targetingBoxRef.current.clientWidth / 2)}px`;
    // prettier-ignore
    // Move targeting box to its new top position:
    targetingBoxRef.current.style.top = `${e.clientY - (targetingBoxRef.current.clientHeight / 2)}px`;
    // Remove 'invisible' class from the previously active targeting box:
    targetingBoxRef.current.classList.remove("invisible");
    // Add 'visible' class to the new targeting box:
    targetingBoxRef.current.classList.add("visible");
  }

  function showContextBoxesAtClickedSpot(e) {
    const isLeftMouseDown = e.button === 0;
    if (isLeftMouseDown) {
      showContextMenu(e);
      showTargetingBox(e);
    }
  }

  function hideContextBoxes(e) {
    e.preventDefault();
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
    targetingBoxRef.current.classList.remove("visible");
    targetingBoxRef.current.classList.add("invisible");
  }

  return (
    <>
      <ContextMenu ref={contextMenuRef} />
      <div
        id="targeting-box"
        className="fixed z-30 size-10 bg-red-500/50 border-4 border-red-950 border-dashed rounded-full invisible"
        ref={targetingBoxRef}
      ></div>
      <img
        onMouseDown={showContextBoxesAtClickedSpot}
        onContextMenu={hideContextBoxes}
        src={donutPile.src}
        alt="Donut pile"
        width={"100%"}
      />
    </>
  );
}
