/**
 * Settings Panel Component
 *
 * A modern settings panel that appears when a node is selected,
 * allowing users to edit node properties like text content.
 *
 * @component
 */
import React, { useState, useEffect } from 'react';
import type { Node } from 'reactflow';

interface NodeData {
  label: string;
  [key: string]: unknown;
}

interface SettingsPanelProps {
  selectedNode: Node<NodeData> | null;
  onBack: () => void;
  onUpdateNode: (nodeId: string, updates: Partial<NodeData>) => void;
}

/**
 * Settings Panel component for editing selected node properties
 *
 * @param {SettingsPanelProps} props - Component props
 * @returns {JSX.Element} Rendered settings panel
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onBack,
  onUpdateNode,
}) => {
  const [textValue, setTextValue] = useState('');

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.label) {
      setTextValue(selectedNode.data.label);
    } else {
      setTextValue('');
    }
  }, [selectedNode]);

  // Handle text change and update node
  const handleTextChange = (value: string) => {
    setTextValue(value);
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { label: value });
    }
  };

  // Handle textarea key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Prevent default Enter behavior, but don't close
      e.preventDefault();
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <aside className='settings-panel'>
      {/* Header with back button */}
      <div className='settings-header'>
        <button className='back-button' onClick={onBack} title='Back to nodes'>
          ←
        </button>
        <h3 className='settings-title'> Message Settings</h3>
      </div>

      {/* Content area */}
      <div className='settings-content'>
        {/* Text editing section */}
        <div className='setting-section'>
          <label className='setting-label'>📝 Message Text</label>
          <div className='text-input-container'>
            <textarea
              className='text-input'
              value={textValue}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Enter your message text...'
              rows={4}
              maxLength={1000}
            />
            <div className='character-count'>{textValue.length}/1000</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SettingsPanel;
