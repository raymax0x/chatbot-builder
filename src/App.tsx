import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';
import type { Node, Edge, Connection, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar.tsx';
import TextNode from './components/TextNode.tsx';
import CustomEdge from './components/CustomEdge.tsx';
import './App.css';

const initialNodes: Node[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  // No longer need selectedNode state since we're using inline editing
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodeLabelChange = useCallback((nodeId: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, label: label },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Create nodes with onLabelChange function
  const createNodeWithData = useCallback(
    (node: Node) => {
      // Preserve existing label if it exists
      return {
        ...node,
        data: {
          ...node.data,
          onLabelChange: onNodeLabelChange,
        },
      };
    },
    [onNodeLabelChange]
  );

  // Apply onLabelChange to all nodes only once when component mounts
  useEffect(() => {
    setNodes((nds) => nds.map(createNodeWithData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Empty dependency array means this only runs once on mount

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);
  // No longer need onClearSelection since we're using inline editing

  // No longer need onSelectionChange since we're using inline editing

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => {
        const targetHasConnection = eds.some(
          (edge) => edge.target === params.target
        );
        if (targetHasConnection) {
          return eds;
        }
        const edgeWithProperties = {
          ...params,
          type: 'custom',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#333',
          },
          style: {
            strokeWidth: 2,
            stroke: '#333',
          },
        };
        return addEdge(edgeWithProperties, eds);
      });
    },
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (!reactFlowInstance) {
      return;
    }

    const flow = reactFlowInstance.toObject();
    const nodesWithNoIncomingEdges = flow.nodes.filter(
      (node) => !flow.edges.some((edge) => edge.target === node.id)
    );

    if (nodesWithNoIncomingEdges.length > 1) {
      alert(
        'Error: More than one node has no incoming connections. Please connect the nodes.'
      );
    } else {
      alert('Flow saved successfully!');
      console.log('Flow saved:', flow);
    }
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
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
    [reactFlowInstance, setNodes]
  );

  return (
    <div className='app-container' ref={reactFlowWrapper}>
      <div className='top-navbar'>
        <div className='logo'>Chatbot Builder</div>
        <button className='save-button' onClick={onSave}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>
            <polyline points='17 21 17 13 7 13 7 21'></polyline>
            <polyline points='7 3 7 8 15 8'></polyline>
          </svg>
          Save Flow
        </button>
      </div>
      <div className='main-content'>
        <div className='flow-container'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // No longer need onSelectionChange
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
            <Background color='#ccc' style={{ backgroundColor: '#f8f8f8' }} />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
