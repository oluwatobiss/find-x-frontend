import defineContextMenuPosition from "./defineContextMenuPosition";

export default function showContextMenu(e) {
  const contextMenu = document.getElementById("context-menu");
  // Get mouse's position relative to the viewport:
  const { clientX: mouseXViewportPosition, clientY: mouseYViewportPosition } =
    e;

  // Define context menu's new left and top positions:
  const { contextMenuLeftPosition, contextMenuTopPosition } =
    defineContextMenuPosition(mouseXViewportPosition, mouseYViewportPosition);

  // Move context menu to its new left and top positions:
  contextMenu.style.left = `${contextMenuLeftPosition}px`;
  contextMenu.style.top = `${contextMenuTopPosition}px`;

  // Remove 'invisible' class from the previously active context menu:
  contextMenu.classList.remove("invisible");

  // Add 'visible' class to the new context menu:
  contextMenu.classList.add("visible");
}
