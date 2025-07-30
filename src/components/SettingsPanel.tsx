import type { Node } from 'reactflow';

interface SettingsPanelProps {
  selectedNode: Node;
  onNodeLabelChange: (nodeId: string, label: string) => void;
  onClearSelection: () => void;
}

const SettingsPanel = ({ selectedNode, onNodeLabelChange, onClearSelection }: SettingsPanelProps) => {
  return (
    <div>
      <div className="settings-header-wrapper">
        <button onClick={onClearSelection} className="back-button">←</button>
        <h3 className="settings-header">Message Settings</h3>
      </div>
      <label className="settings-label">Text</label>
      <textarea
        className="settings-textarea"
        value={selectedNode.data.label}
        onChange={(e) => onNodeLabelChange(selectedNode.id, e.target.value)}
      />
    </div>
  );
};

export default SettingsPanel;
