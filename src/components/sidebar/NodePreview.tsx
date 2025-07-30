/**
 * NodePreview Component
 * 
 * A base component for rendering node previews in the sidebar.
 * This serves as the foundation for specific node type previews.
 * 
 * @component
 */
import React from 'react';
import type { NodeType } from '../../nodeTypes';

/**
 * Props for the NodePreview component
 */
export interface NodePreviewProps {
  /**
   * The node type definition
   */
  nodeType: NodeType;
}

/**
 * Base NodePreview component
 * 
 * @param {NodePreviewProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const NodePreview: React.FC<NodePreviewProps> = ({ nodeType }) => {
  /**
   * Handles the drag start event for a node
   * 
   * @param {React.DragEvent<HTMLDivElement>} event - The drag event
   */
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('application/reactflow', nodeType.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className="dndnode input" 
      onDragStart={onDragStart} 
      draggable
      title={nodeType.description}
    >
      {nodeType.icon && <span className={`node-icon ${nodeType.icon}`}></span>}
      {nodeType.label}
    </div>
  );
};

export default NodePreview;
