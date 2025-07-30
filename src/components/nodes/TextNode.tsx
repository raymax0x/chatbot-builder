/**
 * TextNode Component
 * 
 * A React component that represents a text message node in the chatbot flow.
 * This component allows for inline editing of message text and provides
 * connection handles for the ReactFlow graph.
 * 
 * @component
 */
import { memo, useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { MessageIcon, WhatsAppIcon } from '../icons';

/**
 * TextNode component props extending ReactFlow NodeProps
 * @typedef {Object} TextNodeProps
 * @property {string} label - The text content of the message
 * @property {Function} onLabelChange - Callback function when text content changes
 */
interface TextNodeData {
  label: string;
  onLabelChange?: (nodeId: string, label: string) => void;
}

/**
 * TextNode component for displaying and editing message text
 * 
 * @param {NodeProps<TextNodeData>} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const TextNode = ({ data, id }: NodeProps<TextNodeData>) => {
  // State for tracking edit mode and current edit value
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label || '');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Handles saving the edited text
   */
  const handleSave = () => {
    setIsEditing(false);
    if (data.onLabelChange) {
      data.onLabelChange(id, editValue);
    }
  };

  return (
    <div className='text-node'>
      {/* Node header with title and WhatsApp icon */}
      <div className='node-header'>
        <div className='header-title'>
          <MessageIcon width={16} height={16} />
          <span>Send Message</span>
        </div>
        {/* WhatsApp icon */}
        <div className="whatsapp-icon" title="WhatsApp Message">
          <WhatsAppIcon width={20} height={20} fill="white" />
        </div>
      </div>

      {/* Node content area with inline editing capability */}
      <div className='node-content' onClick={() => {
        if (!isEditing) {
          setIsEditing(true);
          setEditValue(data.label || '');
        }
      }}>
        {isEditing ? (
          <textarea
            ref={inputRef}
            className="node-content-edit"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
            }}
            autoFocus
          />
        ) : (
          data.label ? data.label : <span className="placeholder-text">Enter message text...</span>
        )}
      </div>

      {/* Connection handles for ReactFlow */}
      <Handle 
        type='source' 
        position={Position.Right} 
        style={{ background: '#4ecdc4', border: '2px solid white' }} 
      />
      <Handle 
        type='target' 
        position={Position.Left} 
        style={{ background: '#4ecdc4', border: '2px solid white' }} 
      />
    </div>
  );
};

export default memo(TextNode);
