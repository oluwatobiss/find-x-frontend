import { useEffect, useRef, useState } from "react";
import markItem from "../markItem";

export default function ContextMenu({
  contextMenuRef,
  targetingBoxRef,
  clickedSpotEvent,
  imageItems,
}) {
  const menuItemsSet = useRef(false);
  const menuClicked = useRef(false);
  const [menuItems, setMenuItems] = useState([]);
  const [clickedMenu, setClickedMenu] = useState({
    forceUpdateClickedMenu: true,
    itemName: "",
  });

  function recordClickedMenu(e) {
    console.log("=== start recordClickedMenu start ===");
    const clickedItemName = e.currentTarget.getAttribute("data-menu-item-name");
    menuClicked.current = true;

    console.log(clickedMenu.itemName);
    console.log(clickedItemName);
    console.log(clickedMenu.forceUpdateClickedMenu);

    setClickedMenu({
      forceUpdateClickedMenu: !clickedMenu.forceUpdateClickedMenu,
      itemName: clickedItemName,
    });
    contextMenuRef.current.classList.remove("visible");
    contextMenuRef.current.classList.add("invisible");
    targetingBoxRef.current.classList.remove("visible");
    targetingBoxRef.current.classList.add("invisible");
    console.log("=== end recordClickedMenu end ===");
  }

  useEffect(() => {
    if (menuClicked.current) {
      console.log("=== ContextMenu ===");
      console.log(clickedSpotEvent);
      console.log(imageItems);
      console.log(clickedMenu);

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
      const menuItem = imageItems.find(
        (item) => item.itemName === clickedMenu.itemName
      );

      console.log(imageRect);
      console.log(menuItem);

      if (
        imageClientX >= menuItem?.startX * imageRect.width &&
        imageClientX <= menuItem?.endX * imageRect.width &&
        imageClientY >= menuItem?.startY * imageRect.height &&
        imageClientY <= menuItem?.endY * imageRect.height
      ) {
        console.log("=== You found an item! ===");
        console.log(`${clickedMenu.itemName} found!`);

        const itemX = (menuItem.centerX * imageRect.width) + imageRect.left; // prettier-ignore
        const itemY = (menuItem.centerY * imageRect.height) + imageRect.top; // prettier-ignore

        markItem({ itemX, itemY, itemName: menuItem.itemName });
      }
      menuClicked.current = false;
      console.log("=== Last ===");
      console.log(menuClicked);
    }
  }, [clickedMenu]);

  if (imageItems && !menuItemsSet.current) {
    const menuItems = imageItems.map((item) => {
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

  return (
    <article
      id="context-menu"
      className="fixed z-40 w-[200px] bg-[#1b1a1a] rounded-sm invisible"
      ref={contextMenuRef}
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
