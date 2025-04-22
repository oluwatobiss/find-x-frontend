import { useRef } from "react";

export default function ItemChoiceFeedback({
  itemChoiceFeedbackRef,
  itemChoiceFeedbackVisibilityRef,
  itemFound,
}) {
  const previousTimeout = useRef(null);
  let messageToDisplay = "";
  let backgroundColor = "";
  let display = "none";
  let color = "";

  if (itemChoiceFeedbackVisibilityRef.current && itemFound.itemFound === true) {
    clearTimeout(previousTimeout.current);
    messageToDisplay = `Yep! You found the ${itemFound.clickedMenu}. 👏`;
    backgroundColor = "#edf7ed";
    color = "#1e4620";
    itemChoiceFeedbackRef.current.style.display = "block";
    previousTimeout.current = setTimeout(() => {
      itemChoiceFeedbackRef.current.style.display = "none";
      itemChoiceFeedbackVisibilityRef.current = false;
    }, 3000);
  }

  if (
    itemChoiceFeedbackVisibilityRef.current &&
    itemFound.itemFound === false
  ) {
    clearTimeout(previousTimeout.current);
    messageToDisplay = `Nope. That's not the ${itemFound.clickedMenu}.`;
    backgroundColor = "#fdeded";
    color = "#5f2120";
    if (itemFound.clickedMenu) {
      itemChoiceFeedbackRef.current.style.display = "block";
      previousTimeout.current = setTimeout(() => {
        itemChoiceFeedbackRef.current.style.display = "none";
        itemChoiceFeedbackVisibilityRef.current = false;
      }, 3000);
    }
  }

  return (
    <div
      ref={itemChoiceFeedbackRef}
      className="fixed z-50 rounded-sm p-4 text-center top-20 bg-white"
      style={{ backgroundColor, color, display }}
    >
      {messageToDisplay}
    </div>
  );
}
