import { useRef, useState } from "react";
import itemsToFind from "../itemsToFind";

export default function ContextMenu({ ref, clickedSpot, imageItems }) {
  const menuItemsSet = useRef(false);
  const menuClicked = useRef(false);
  const [menuItems, setMenuItems] = useState([]);
  const [clickedMenu, setClickedMenu] = useState("");

  if (menuClicked.current) {
    console.log("=== ContextMenu ===");
    console.log(clickedSpot);
    console.log(imageItems);
    console.log({ clickedMenu });
    const menuItemData = imageItems.find((item) => {
      console.log("=== IF Statement ===");
      console.log(item.itemName === clickedMenu);
      console.log(item.itemName);
      console.log(clickedMenu);
      
      
      return item.itemName === clickedMenu;
    });
    console.log(menuItemData);
    if (
      clickedSpot.imageX >= menuItemData?.startX * clickedSpot.imageWidth &&
      clickedSpot.imageX <= menuItemData?.endX * clickedSpot.imageWidth &&
      clickedSpot.imageY >= menuItemData?.startY * clickedSpot.imageHeight &&
      clickedSpot.imageY <= menuItemData?.endY * clickedSpot.imageHeight
    ) {
      console.log("=== You found an item! ===");
      console.log(`${clickedMenu} found!`);
    }
    menuClicked.current = false;
  }

  function recordClickedMenu(e) {
    menuClicked.current = true;
    setClickedMenu(e.currentTarget.getAttribute("data-menu-item-name"));
  }

  async function createMenuItems() {
    const menuItems = itemsToFind.map(async (item) => {
      const itemImage = await import(
        `../assets/images/${item.fileName}.${item.fileExtension}`
      );
      return (
        <div
          className="flex items-center h-[40px] px-[13px] text-[#eee] cursor-pointer rounded-sm hover:bg-[#343434]"
          data-menu-item-name={item.name}
          key={crypto.randomUUID()}
          onClick={recordClickedMenu}
        >
          <img
            alt={item.name}
            src={itemImage.default.src}
            className="w-[15%]"
          />
          <span className="pl-[15px]">{item.name}</span>
        </div>
      );
    });
    const contextMenuItems = await Promise.all(menuItems);
    setMenuItems(contextMenuItems);
    menuItemsSet.current = true;
  }

  !menuItemsSet.current && createMenuItems();

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
