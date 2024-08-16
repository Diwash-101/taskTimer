import { useState } from "react";

export function useReorderableList(initialItems = []) {
  const [listItems, setListItems] = useState(initialItems);
  let dragIndex;
  const moveItem = (dragIndex, hoverIndex) => {
    const updatedItems = [...listItems];
    const [removedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, removedItem);
    setListItems(updatedItems);
    dragIndex = -1;
  };
  const handleDragStart = (index) => {
    dragIndex = index;
  };

  const handleDrop = (index) => {
    if (dragIndex >= 0) {
      moveItem(dragIndex, index);
    }
  };
  return {
    listItems,
    handleDragStart,
    handleDrop,
  };
}
