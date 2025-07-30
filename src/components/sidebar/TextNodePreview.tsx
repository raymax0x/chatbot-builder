/**
 * TextNodePreview Component
 * 
 * A specialized component for rendering text message node previews in the sidebar.
 * This extends the base NodePreview with text node-specific styling and behavior.
 * 
 * @component
 */
import React from 'react';
import NodePreview from './NodePreview';
import type { NodePreviewProps } from './NodePreview';

/**
 * TextNodePreview component
 * 
 * @param {NodePreviewProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const TextNodePreview: React.FC<NodePreviewProps> = ({ nodeType }) => {
  // For now, we're using the base NodePreview
  // In the future, we can add text node-specific customizations here
  return (
    <NodePreview 
      nodeType={nodeType} 
    />
  );
};

export default TextNodePreview;
