/**
 * Flow Component
 * 
 * A React component that renders the main ReactFlow canvas where the chatbot flow
 * is built and visualized. Handles node and edge interactions.
 * 
 * @component
 */
import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Controls,
} from 'reactflow';
import type {
  Node,
  Edge,
  Connection,
  ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import custom node and edge types
import TextNode from '../nodes/TextNode';
import CustomEdge from '../edges/CustomEdge';

// Initial empty nodes array
const initialNodes: Node[] = [];

// Counter for generating unique node IDs
let id = 0;
const getId = () => `dndnode_${id++}`;

/**
 * Flow component props
 */
interface FlowProps {
  /**
   * Callback function when the flow is saved
   */
  onSave?: () => void;
}

/**
 * Flow component for the main ReactFlow canvas
 * 
 * @param {FlowProps} props - Component props
 * @returns {JSX.Element} Rendered flow component
 */
const Flow: React.FC<FlowProps> = ({ onSave }) => {
  // Reference to the flow wrapper element
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Reference to the ReactFlow instance
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);

  /**
   * Handles updating a node's label
   * 
   * @param {string} nodeId - ID of the node to update
   * @param {string} label - New label value
   */
  const onNodeLabelChange = useCallback((nodeId: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Node creation is now handled directly in the onDrop function

  /**
   * Handles connecting two nodes
   * 
   * @param {Edge | Connection} params - Connection parameters
   */
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  /**
   * Handles saving the flow
   */
  const handleSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem('chatbotFlow', JSON.stringify(flow));
      
      if (onSave) {
        onSave();
      } else {
        alert('Flow saved successfully!');
      }
    }
  }, [reactFlowInstance, onSave]);
  
  // Use the handleSave function when needed
  React.useEffect(() => {
    // Example: You could set up keyboard shortcuts here
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  /**
   * Handles drag over event for node creation
   * 
   * @param {React.DragEvent<HTMLDivElement>} event - Drag event
   */
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handles drop event for node creation
   * 
   * @param {React.DragEvent<HTMLDivElement>} event - Drop event
   */
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the position where the element was dropped
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      if (!position) return;

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { 
          label: `Text message`,
          onLabelChange: onNodeLabelChange
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, onNodeLabelChange]
  );

  // Define custom node and edge types
  const nodeTypes = React.useMemo(() => ({ textNode: TextNode }), []);
  const edgeTypes = React.useMemo(() => ({ custom: CustomEdge }), []);

  return (
    <div className='flow-container' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'custom',
          style: { strokeWidth: 2, stroke: '#333' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#333',
          },
        }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

/**
 * FlowWithProvider component that wraps Flow with ReactFlowProvider
 * 
 * @param {FlowProps} props - Component props
 * @returns {JSX.Element} Rendered flow component with provider
 */
const FlowWithProvider: React.FC<FlowProps> = (props) => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};

export default FlowWithProvider;
