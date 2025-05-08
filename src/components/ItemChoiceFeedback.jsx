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
    <article className="fixed top-20 z-50 w-full">
      <div
        ref={itemChoiceFeedbackRef}
        className="mx-auto p-4 w-fit rounded-sm"
        style={{ backgroundColor, color, display }}
      >
        {messageToDisplay}
      </div>
    </article>
  );
}
