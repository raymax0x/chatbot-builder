/**
 * CustomEdge Component
 * 
 * A React component that renders a custom edge for the ReactFlow graph.
 * This component creates a styled connection between nodes in the chatbot flow.
 * 
 * @component
 */
import type { EdgeProps } from 'reactflow';
import { getBezierPath } from 'reactflow';

/**
 * CustomEdge component for styling connections between nodes
 * 
 * @param {EdgeProps} props - Edge properties from ReactFlow
 * @returns {JSX.Element} Rendered edge component
 */
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  // Calculate the bezier path for the edge
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={{
        ...style,
        strokeWidth: 2,
        stroke: '#333',
      }}
      className="custom-edge react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default CustomEdge;
