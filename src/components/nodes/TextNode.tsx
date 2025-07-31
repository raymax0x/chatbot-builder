/**
 * TextNode Component
 * 
 * A React component that represents a text message node in the chatbot flow.
 * This component displays message text and provides connection handles for the ReactFlow graph.
 * 
 * @component
 */
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { MessageIcon, WhatsAppIcon } from '../icons';

/**
 * TextNode component props extending ReactFlow NodeProps
 * @typedef {Object} TextNodeProps
 * @property {string} label - The text content of the message
 */
interface TextNodeData {
  label: string;
}

/**
 * TextNode component for displaying message text
 * 
 * @param {NodeProps<TextNodeData>} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const TextNode = ({ data }: NodeProps<TextNodeData>) => {

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

      {/* Node content area */}
      <div className='node-content'>
        {data.label ? data.label : <span className="placeholder-text">No message text</span>}
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
