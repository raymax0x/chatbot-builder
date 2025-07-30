import React from 'react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="description">Drag the message node below to create a new message in your chatbot flow.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
        Message
      </div>
    </aside>
  );
};

export default Sidebar;
