export default function defineContextMenuPosition(
  mouseXViewportPosition,
  mouseYViewportPosition
) {
  const contextMenu = document.getElementById("context-menu");

  // prettier-ignore
  // Check if the sum of the mouse's X position and the context-menu's width is greater than the viewport's width:
  const contextMenuIsOutOfXView =
        (mouseXViewportPosition + contextMenu.clientWidth) > window.innerWidth;

  // prettier-ignore
  // Check if the sum of the mouse's Y position and the context-menu's height is greater than the viewport's height:
  const contextMenuIsOutOfYView =
        (mouseYViewportPosition + contextMenu.clientHeight) > window.innerHeight;

  let contextMenuLeftPosition = mouseXViewportPosition;
  let contextMenuTopPosition = mouseYViewportPosition;

  if (contextMenuIsOutOfXView) {
    // Subtract the mouse's X position from the viewport's width to get the context-menu's portion that is within the viewport:
    const sizeOfContextMenuWithinXViewport =
      window.innerWidth - mouseXViewportPosition;

    // Subtract the sizeOfContextMenuWithinXViewport from the context-menu's width to get the context-menu's portion that is outside the viewport:
    const sizeOfContextMenuOutOfXViewport =
      contextMenu.clientWidth - sizeOfContextMenuWithinXViewport;

    // Subtract sizeOfContextMenuOutOfXViewport from the mouse's X position to move the context-menu within the viewport:
    // (Note: -15 moves context-menu 15px away from the viewport's edge.)
    contextMenuLeftPosition =
      mouseXViewportPosition - sizeOfContextMenuOutOfXViewport - 15;
  }

  if (contextMenuIsOutOfYView) {
    // Subtract the mouse's Y position from the viewport's height to get the context-menu's portion that is within the viewport:
    const sizeOfContextMenuWithinYViewport =
      window.innerHeight - mouseYViewportPosition;

    // Subtract the sizeOfContextMenuWithinYViewport from the context-menu's height to get the context-menu's portion that is outside the viewport:
    const sizeOfContextMenuOutOfYViewport =
      contextMenu.clientHeight - sizeOfContextMenuWithinYViewport;

    // Subtract sizeOfContextMenuOutOfYViewport from the mouse's Y position to move the context-menu within the viewport:
    contextMenuTopPosition =
      mouseYViewportPosition - sizeOfContextMenuOutOfYViewport;
  }

  return { contextMenuLeftPosition, contextMenuTopPosition };
}
