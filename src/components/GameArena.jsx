import { useEffect, useRef, useState } from "react";
import ResultModal from "./ResultModal";
import ItemChoiceFeedback from "./ItemChoiceFeedback";
import ContextMenu from "./ContextMenu";
import showContextMenu from "../showContextMenu";

export default function GameArena() {
  const imageItemsRef = useRef(null);
  const contextMenuRef = useRef(null);
  const targetingBoxRef = useRef(null);
  const itemChoiceFeedbackRef = useRef(null);
  const itemChoiceFeedbackVisibilityRef = useRef(false);
  const [gameResult, setGameResult] = useState({ show: false, text: "" });
  const [clickedSpotEvent, setClickedSpotEvent] = useState({});
  const [itemFound, setItemFound] = useState({
    itemFound: false,
    clickedMenu: "",
  });
  const gameImageJson = localStorage.getItem("findXGameImage");
  const userToken = localStorage.getItem("findXToken");
  const gameImage = gameImageJson && JSON.parse(gameImageJson);
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

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
    itemChoiceFeedbackRef.current.style.display = "none";
    setClickedSpotEvent(e);
    showContextMenu(e);
    showTargetingBox(e);
  }

  function hideContextBoxes(e) {
    e.preventDefault();
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
    targetingBoxRef.current.classList.remove("visible");
    targetingBoxRef.current.classList.add("invisible");
  }

  useEffect(() => {
    async function getImageItemsData() {
      try {
        const response = await fetch(`${backendUri}/images/${gameImage?.id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const imageItemsData = await response.json();
        imageItemsRef.current = imageItemsData;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getImageItemsData();
  }, []);

  return (
    <div
      id="game-arena"
      className="relative h-full flex justify-center items-center"
    >
      {gameResult.show && <ResultModal text={gameResult.text} />}
      <ItemChoiceFeedback
        itemChoiceFeedbackRef={itemChoiceFeedbackRef}
        itemChoiceFeedbackVisibilityRef={itemChoiceFeedbackVisibilityRef}
        itemFound={itemFound}
      />
      {!gameResult.show && (
        <ContextMenu
          imageItemsRef={imageItemsRef}
          contextMenuRef={contextMenuRef}
          targetingBoxRef={targetingBoxRef}
          itemChoiceFeedbackVisibilityRef={itemChoiceFeedbackVisibilityRef}
          clickedSpotEvent={clickedSpotEvent}
          setGameResult={setGameResult}
          setItemFound={setItemFound}
        />
      )}
      {!gameResult.show && (
        <div
          id="targeting-box"
          className="fixed z-40 size-10 bg-red-500/50 border-4 border-red-950 border-dashed rounded-full invisible"
          ref={targetingBoxRef}
        ></div>
      )}
      <img
        className="w-full"
        alt="Find X's game image"
        onClick={showContextBoxesAtClickedSpot}
        onContextMenu={hideContextBoxes}
        src={gameImage.url}
      />
    </div>
  );
}
