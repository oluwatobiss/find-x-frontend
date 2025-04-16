import { useEffect, useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import showContextMenu from "../showContextMenu";

export default function GameArena() {
  const imageItemsRef = useRef(null);
  const contextMenuRef = useRef(null);
  const targetingBoxRef = useRef(null);
  const [clickedSpotData, setClickedSpotData] = useState({
    imageX: 0,
    imageY: 0,
    imageWidth: 0,
    imageHeight: 0,
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
    // imageRect = Info about the image's size and position relative to the browser's viewport
    // clientX = x-position of the mouse click relative to the browser's viewport
    // clientY = y-position of the mouse click relative to the browser's viewport
    // clientX/Y illustration --> https://stackoverflow.com/a/21452887/11841906
    // imageX = x-position of the mouse click relative to the image
    // imageY = y-position of the mouse click relative to the image
    const imageRect = e.currentTarget.getBoundingClientRect();
    const imageX = e.clientX - imageRect.left;
    const imageY = e.clientY - imageRect.top;

    // console.log({ clientX: e.clientX, clientY: e.clientY });
    // console.log({ imageX, imageY });
    // console.log({ startX, startY, endX, endY });

    // console.log(imageRect);

    setClickedSpotData({
      imageX,
      imageY,
      imageWidth: imageRect.width,
      imageHeight: imageRect.height,
    });

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
    <div className="h-full flex items-center">
      <ContextMenu
        ref={contextMenuRef}
        clickedSpot={clickedSpotData}
        imageItems={imageItemsRef?.current}
      />
      <div
        id="targeting-box"
        className="fixed z-30 size-10 bg-red-500/50 border-4 border-red-950 border-dashed rounded-full invisible"
        ref={targetingBoxRef}
      ></div>
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
