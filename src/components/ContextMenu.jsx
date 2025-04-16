import { useRef, useState } from "react";

export default function ContextMenu({ ref, clickedSpot, imageItems }) {
  const menuItemsSet = useRef(false);
  const menuClicked = useRef(false);
  const [menuItems, setMenuItems] = useState([]);
  const [clickedMenu, setClickedMenu] = useState("");

  function recordClickedMenu(e) {
    menuClicked.current = true;
    setClickedMenu(e.currentTarget.getAttribute("data-menu-item-name"));
  }

  if (menuClicked.current) {
    console.log("=== ContextMenu ===");
    console.log(clickedSpot);
    console.log(imageItems);
    console.log({ clickedMenu });
    const menuItem = imageItems.find((item) => item.itemName === clickedMenu);
    console.log(menuItem);
    if (
      clickedSpot.imageX >= menuItem?.startX * clickedSpot.imageWidth &&
      clickedSpot.imageX <= menuItem?.endX * clickedSpot.imageWidth &&
      clickedSpot.imageY >= menuItem?.startY * clickedSpot.imageHeight &&
      clickedSpot.imageY <= menuItem?.endY * clickedSpot.imageHeight
    ) {
      console.log("=== You found an item! ===");
      console.log(`${clickedMenu} found!`);
    }
    menuClicked.current = false;
  }

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
      ref={ref}
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
