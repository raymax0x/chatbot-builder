/**
 * Sidebar Component
 * 
 * A React component that renders the sidebar containing draggable nodes
 * that can be added to the chatbot flow.
 * 
 * @component
 */

// Import node types from the central registry
import type { NodeType } from '../../nodeTypes';
import { nodeTypes } from '../../nodeTypes';

// Import preview components registry
import previewComponents from '../sidebar';

/**
 * Sidebar component for displaying draggable node options
 * 
 * @returns {JSX.Element} Rendered sidebar component
 */
const Sidebar = () => {
  /**
   * Renders the appropriate preview component for a node type
   * 
   * @param {NodeType} nodeType - The node type to render a preview for
   * @returns {JSX.Element} The rendered preview component
   */
  const renderNodePreview = (nodeType: NodeType) => {
    // Get the component from the registry
    const PreviewComponent = previewComponents[nodeType.previewComponent as keyof typeof previewComponents];
    
    // If the component exists, render it with the node type
    if (PreviewComponent) {
      return <PreviewComponent nodeType={nodeType} key={nodeType.type} />;
    }
    
    // Fallback for node types without a specific preview component
    return (
      <div 
        key={nodeType.type}
        className="dndnode input" 
        onDragStart={(event) => {
          event.dataTransfer.setData('application/reactflow', nodeType.type);
          event.dataTransfer.effectAllowed = 'move';
        }} 
        draggable
        title={nodeType.description}
      >
        {nodeType.icon && <span className={`node-icon ${nodeType.icon}`}></span>}
        {nodeType.label}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      <div className="description">
        Drag nodes below to create your chatbot flow.
      </div>
      
      {/* Render all available node types with their specific preview components */}
      {nodeTypes.map(renderNodePreview)}
    </aside>
  );
};

export default Sidebar;
