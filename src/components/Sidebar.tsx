import React from 'react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="description">You can drag this node to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
        Message
      </div>
    </aside>
  );
};

export default Sidebar;
