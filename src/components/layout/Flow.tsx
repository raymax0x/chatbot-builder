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
import type { Node, Edge, Connection, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import { toast } from 'react-toastify';

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
  
  /**
   * Function to register the Flow component's save function with the parent
   */
  registerSaveFunction?: (saveFunction: () => boolean) => void;
}

/**
 * Flow component for the main ReactFlow canvas
 *
 * @param {FlowProps} props - Component props
 * @returns {JSX.Element} Rendered flow component
 */
const Flow: React.FC<FlowProps> = ({ onSave, registerSaveFunction }) => {
  // Reference to the flow wrapper element
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Reference to the ReactFlow instance
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  /**
   * Handles updating a node's label
   *
   * @param {string} nodeId - ID of the node to update
   * @param {string} label - New label value
   */
  const onNodeLabelChange = useCallback(
    (nodeId: string, label: string) => {
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
    },
    [setNodes]
  );

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
   * @returns {boolean} Whether the save was successful (validation passed)
   */
  const handleSave = useCallback(() => {
    if (reactFlowInstance) {
      // Validation: If there are multiple nodes, check for nodes with empty target handles
      if (nodes.length > 1) {
        // Count nodes with empty target handles (no incoming connections)
        const nodesWithEmptyTargets = nodes.filter((node) => {
          return !edges.some((edge) => edge.target === node.id);
        });
        
        // If more than one node has empty target handles, show error
        if (nodesWithEmptyTargets.length > 1) {
          toast.error(
            'Error: Multiple nodes have no incoming connections. Only one node can be a starting point.',
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          return false; // Validation failed, prevent saving
        }
      }

      // If validation passes or not applicable, proceed with saving
      const flow = reactFlowInstance.toObject();
      localStorage.setItem('chatbotFlow', JSON.stringify(flow));

      // Show success toast when validation passes
      // But don't show it if onSave is provided (to avoid duplicate toasts)
      if (!onSave) {
        toast.success('Flow saved successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
      return true; // Validation passed, save successful
    }
    
    return false; // reactFlowInstance not available
  }, [reactFlowInstance, onSave, nodes, edges]);

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
          onLabelChange: onNodeLabelChange,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, onNodeLabelChange]
  );

  // Define custom node and edge types
  const nodeTypes = React.useMemo(() => ({ textNode: TextNode }), []);
  const edgeTypes = React.useMemo(() => ({ custom: CustomEdge }), []);

  // Register the save function with the parent component
  React.useEffect(() => {
    if (registerSaveFunction) {
      registerSaveFunction(handleSave);
    }
  }, [registerSaveFunction, handleSave]);

  // The keyboard shortcut for saving has been removed
  // Save functionality is now only available through the navbar button

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
