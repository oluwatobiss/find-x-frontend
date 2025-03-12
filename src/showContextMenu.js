import defineContextMenuPosition from "./defineContextMenuPosition";

export default function showContextMenu(e, contextMenuIsActive) {
  const contextMenu = document.getElementById("context-menu");
  // Get mouse's position relative to the viewport:
  const { clientX: mouseXViewportPosition, clientY: mouseYViewportPosition } =
    e;

  // Define context menu's left and top positions:
  const { contextMenuLeftPosition, contextMenuTopPosition } =
    defineContextMenuPosition(mouseXViewportPosition, mouseYViewportPosition);

  // Move context menu to its left and top positions:
  contextMenu.style.left = `${contextMenuLeftPosition}px`;
  contextMenu.style.top = `${contextMenuTopPosition}px`;

  // Remove 'visible' class from the previously active context menu:
  contextMenuIsActive && contextMenu.classList.remove("visible");

  // Add 'visible' class to context menu to show it at its new position:
  // Note: setTimeout() makes the CSS transition effective. It prevents remove("visible")
  // and add("visible") from occurring in the same event loop. So, add("visible") happens
  // some moment after remove("visible").
  // Learn more:
  //   - mikechambers.com/blog/2011/07/20/timing-issues-when-animating-with-css3-transitions
  //   - youtube.com/watch?v=cCOL7MC4Pl0
  setTimeout(() => {
    contextMenu.classList.add("visible");
  });
}
