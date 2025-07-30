import { useState, useEffect } from 'react';
import type { Node } from 'reactflow';

interface SettingsPanelProps {
  selectedNode: Node;
  onNodeLabelChange: (nodeId: string, label: string) => void;
  onClearSelection: () => void;
}

const SettingsPanel = ({ selectedNode, onNodeLabelChange, onClearSelection }: SettingsPanelProps) => {
  // Local state to track the input value
  const [inputValue, setInputValue] = useState(selectedNode.data.label);
  
  // Update local state when selectedNode changes
  useEffect(() => {
    setInputValue(selectedNode.data.label);
  }, [selectedNode.id, selectedNode.data.label]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onNodeLabelChange(selectedNode.id, newValue);
  };
  
  return (
    <div className="settings-panel">
      <div className="settings-header-wrapper">
        <button onClick={onClearSelection} className="back-button">←</button>
        <h3 className="settings-header">Message Settings</h3>
      </div>
      <label className="settings-label">Text</label>
      <textarea
        className="settings-textarea"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter message text..."
        autoFocus
      />
    </div>
  );
};

export default SettingsPanel;
