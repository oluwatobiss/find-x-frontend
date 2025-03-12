import { useEffect, useState } from "react";
import itemsToFind from "../itemsToFind";

export default function ContextMenu() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
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
    }
    createMenuItems();
  }, []);
  return (
    <article
      id="context-menu"
      className="fixed z-40 w-[200px] bg-[#1b1a1a] rounded-sm invisible"
    >
      <span
        title="Close"
        className="float-right pt-[7px] px-[7px] cursor-pointer"
      >
        ❌
      </span>
      <div className="clear-right">{menuItems}</div>
    </article>
  );
}
