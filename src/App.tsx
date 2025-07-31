/**
 * Main App Component
 *
 * The root component of the Chatbot Builder application.
 * Orchestrates the layout and main components of the application.
 */
import React, { useCallback, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Node } from 'reactflow';

// Import modular components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SettingsPanel from './components/layout/SettingsPanel';
import Flow from './components/layout/Flow';

// Import styles
import './styles/index.css';
import './styles/settingsPanel.css';

// Define node data interface
interface NodeData {
  label: string;
  [key: string]: unknown;
}

/**
 * App component - Main application container
 *
 * @returns {JSX.Element} Rendered application
 */
const App: React.FC = () => {
  // Reference to the Flow component's save function
  const flowSaveFunctionRef = useRef<(() => boolean) | null>(null);
  
  // State for selected node and settings panel
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  
  // Reference to the Flow component's node update function
  const nodeUpdateFunctionRef = useRef<((nodeId: string, updates: Partial<NodeData>) => void) | null>(null);

  /**
   * Handles saving the flow
   * This delegates to the Flow component's save function to ensure validation is used
   */
  const handleSave = useCallback(() => {
    // Call the Flow component's save function if available
    if (flowSaveFunctionRef.current) {
      // Call the Flow component's save function, which handles validation
      // The function returns a boolean indicating whether validation passed
      const saveSuccessful = flowSaveFunctionRef.current();
      
      // Only show success toast if validation passed
      if (saveSuccessful) {
        toast.success('Flow saved successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, []);

  /**
   * Callback to store the Flow component's save function
   */
  const registerFlowSaveFunction = useCallback((saveFunction: () => boolean) => {
    flowSaveFunctionRef.current = saveFunction;
  }, []);

  /**
   * Handle node selection from Flow component
   */
  const handleNodeSelect = useCallback((node: Node<NodeData> | null) => {
    setSelectedNode(node);
    setShowSettingsPanel(!!node);
  }, []);

  /**
   * Handle going back to nodes panel
   */
  const handleBackToNodes = useCallback(() => {
    setSelectedNode(null);
    setShowSettingsPanel(false);
  }, []);

  /**
   * Handle updating a node from settings panel
   */
  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<NodeData>) => {
    if (nodeUpdateFunctionRef.current) {
      nodeUpdateFunctionRef.current(nodeId, updates);
    }
  }, []);
  
  /**
   * Register the Flow component's node update function
   */
  const registerNodeUpdateFunction = useCallback((updateFunction: (nodeId: string, updates: Partial<NodeData>) => void) => {
    nodeUpdateFunctionRef.current = updateFunction;
  }, []);

  return (
    <div className='app-container'>
      {/* Top navigation bar */}
      <Navbar onSave={handleSave} />
      
      {/* Main content area */}
      <div className='main-content'>
        {/* Flow canvas */}
        <Flow 
          onSave={handleSave} 
          registerSaveFunction={registerFlowSaveFunction}
          onNodeSelect={handleNodeSelect}
          onUpdateNode={registerNodeUpdateFunction}
        />
        
        {/* Conditional sidebar - show Settings Panel when node is selected, otherwise show Nodes Panel */}
        {showSettingsPanel ? (
          <SettingsPanel 
            selectedNode={selectedNode}
            onBack={handleBackToNodes}
            onUpdateNode={handleUpdateNode}
          />
        ) : (
          <Sidebar />
        )}
      </div>
      
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
