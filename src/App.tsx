import { useState, useCallback, useRef, useMemo } from 'react';
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
import SettingsPanel from './components/SettingsPanel.tsx';
import TextNode from './components/TextNode.tsx';
import CustomEdge from './components/CustomEdge.tsx';
import './App.css';

const initialNodes: Node[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodeLabelChange = (nodeId: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: { ...node.data, label: label },
          };

          if (selectedNode && selectedNode.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);
  const onClearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onSelectionChange = useCallback(
    (params: { nodes: Node[]; edges: Edge[] }) => {
      if (params.nodes.length === 1) {
        setSelectedNode(params.nodes[0]);
      } else {
        setSelectedNode(null);
      }
    },
    []
  );

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
        data: { label: `Text message` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className='app-container' ref={reactFlowWrapper}>
      <div className='flow-container'>
        <div className='save-button-wrapper'>
          <button onClick={onSave}>Save Flow</button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
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
          <Background />
        </ReactFlow>
      </div>
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeLabelChange={onNodeLabelChange}
          onClearSelection={onClearSelection}
        />
      ) : (
        <Sidebar />
      )}
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
