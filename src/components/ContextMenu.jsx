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
            className="context-menu-item clickable-context"
            data-menu-item-name={item.name}
            key={crypto.randomUUID()}
          >
            <img alt={item.name} src={itemImage.default.src} />
            <span>{item.name}</span>
          </div>
        );
      });
      const contextMenuItems = await Promise.all(menuItems);
      setMenuItems(contextMenuItems);
    }
    createMenuItems();
  }, []);
  return (
    <div>
      <span title="Close">❌</span>
      {menuItems}
    </div>
  );
}
