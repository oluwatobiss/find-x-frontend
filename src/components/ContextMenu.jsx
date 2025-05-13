import { useEffect, useRef, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import markItem from "../markItem";

export default function ContextMenu({
  imageItemsRef,
  contextMenuRef,
  targetingBoxRef,
  itemChoiceFeedbackVisibilityRef,
  clickedSpotEvent,
  setGameResult,
  setItemFound,
}) {
  const menuItemsSet = useRef(false);
  const menuClicked = useRef(false);
  const [menuItems, setMenuItems] = useState([]);
  const [clickedMenu, setClickedMenu] = useState({
    forceUpdateClickedMenu: true,
    itemName: "",
  });
  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  function recordClickedMenu(e) {
    const clickedItemName = e.currentTarget.getAttribute("data-menu-item-name");
    menuClicked.current = true;
    setClickedMenu({
      forceUpdateClickedMenu: !clickedMenu.forceUpdateClickedMenu,
      itemName: clickedItemName,
    });
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
    targetingBoxRef.current.classList.remove("visible");
    targetingBoxRef.current.classList.add("invisible");
  }

  if (imageItemsRef.current && !menuItemsSet.current) {
    const menuItems = imageItemsRef.current.map((item) => {
      return (
        <div
          className="flex items-center h-[40px] px-[13px] text-[#eee] cursor-pointer rounded-sm hover:bg-[#343434]"
          data-menu-item-name={item.itemName}
          key={crypto.randomUUID()}
          onClick={recordClickedMenu}
        >
          <img
            alt={item.itemName}
            src={item.itemImageUrl}
            className="w-[15%]"
          />
          <span className="pl-[15px]">{item.itemName}</span>
        </div>
      );
    });
    setMenuItems(menuItems);
    menuItemsSet.current = true;
  }

  useEffect(() => {
    let ignore = false;
    if (menuClicked.current) {
      // imageRect = Info about the image's size and position relative to the browser's viewport
      // clientX = x-position of the mouse click relative to the browser's viewport
      // clientY = y-position of the mouse click relative to the browser's viewport
      // clientX/Y illustration --> https://stackoverflow.com/a/21452887/11841906
      // imageClientX = clientX minus any offset on the image's left
      // imageClientY = clientY minus any offset on the image's top
      // itemX = center-x-position of the item relative to the image
      // itemY = center-y-position of the item relative to the image
      const imageRect = clickedSpotEvent.target.getBoundingClientRect();
      const imageClientX = clickedSpotEvent.clientX - imageRect.left;
      const imageClientY = clickedSpotEvent.clientY - imageRect.top;
      const imageItems = imageItemsRef.current;
      const menuItem = imageItems.find(
        (item) => item.itemName === clickedMenu.itemName
      );
      if (
        imageClientX >= menuItem?.startX * imageRect.width &&
        imageClientX <= menuItem?.endX * imageRect.width &&
        imageClientY >= menuItem?.startY * imageRect.height &&
        imageClientY <= menuItem?.endY * imageRect.height
      ) {
        const itemX = menuItem.centerX * imageRect.width;
        const itemY = menuItem.centerY * imageRect.height;
        const newImageItems = imageItems.filter(
          (item) => item.itemName !== clickedMenu.itemName
        );
        setItemFound({ itemFound: true, clickedMenu: clickedMenu.itemName });
        markItem({ itemX, itemY, itemName: menuItem.itemName });
        menuItemsSet.current = false;
        imageItemsRef.current = newImageItems;
        if (newImageItems.length === 0) {
          pause();
          async function checkIfPlayerMadeTopTen() {
            try {
              const userToken = localStorage.getItem("findXToken");
              const loggedInUserJson = localStorage.getItem("findXUserData");
              const loggedInUser =
                loggedInUserJson && JSON.parse(loggedInUserJson);
              const response = await fetch(
                `${import.meta.env.PUBLIC_BACKEND_URI}/leaders`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    playerId: loggedInUser
                      ? loggedInUser.username
                      : "anonymous",
                    hours,
                    minutes,
                    seconds,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              );
              const leader = await response.json();
              leader
                ? setGameResult({ show: true, text: "congrats" })
                : setGameResult({ show: true, text: "oops" });
            } catch (error) {
              if (error instanceof Error) console.error(error.message);
            }
          }
          checkIfPlayerMadeTopTen();
        }
      } else {
        setItemFound({ itemFound: false, clickedMenu: clickedMenu.itemName });
      }
      itemChoiceFeedbackVisibilityRef.current = true;
      menuClicked.current = false;
    }
    return () => {
      ignore = true;
    };
  }, [clickedMenu]);

  return (
    <article
      ref={contextMenuRef}
      id="context-menu"
      className="fixed z-50 w-[200px] bg-[#1b1a1a] rounded-sm invisible"
    >
      <section className="py-[7px] px-[13px] flex justify-between">
        <span className="text-[#eee]">Find...</span>
        <span title="Close" className="cursor-pointer">
          ❌
        </span>
      </section>
      <section>{menuItems}</section>
    </article>
  );
}
