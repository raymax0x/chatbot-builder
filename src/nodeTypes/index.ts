/**
 * Node Types Registry
 * 
 * This file serves as a central registry for all node types available in the chatbot builder.
 * It defines the interfaces and provides the available node types that can be used in the flow.
 */

/**
 * Node type definition
 * @typedef {Object} NodeType
 * @property {string} type - The internal type identifier for the node
 * @property {string} label - The display label for the node
 * @property {string} description - A brief description of the node's purpose
 * @property {string} [icon] - Optional icon class name
 * @property {string} previewComponent - The name of the component to use for sidebar preview
 */
export interface NodeType {
  type: string;
  label: string;
  description?: string;
  icon?: string;
  previewComponent: string;
}

/**
 * Available node types that can be dragged into the flow
 * This can be easily extended in the future with more node types
 */
export const nodeTypes: NodeType[] = [
  {
    type: 'textNode',
    label: 'Message',
    description: 'A simple text message node',
    icon: 'message-icon',
    previewComponent: 'TextNodePreview'
  },
  // Future node types can be added here
  // Example:
  // {
  //   type: 'questionNode',
  //   label: 'Question',
  //   description: 'A node that asks a question and branches based on response',
  //   icon: 'question-icon',
  //   previewComponent: 'QuestionNodePreview'
  // },
];

/**
 * Get a node type by its type identifier
 * 
 * @param {string} type - The type identifier to look up
 * @returns {NodeType|undefined} The node type or undefined if not found
 */
export const getNodeTypeByType = (type: string): NodeType | undefined => {
  return nodeTypes.find(nodeType => nodeType.type === type);
};

/**
 * Check if a node type exists
 * 
 * @param {string} type - The type identifier to check
 * @returns {boolean} True if the node type exists, false otherwise
 */
export const nodeTypeExists = (type: string): boolean => {
  return nodeTypes.some(nodeType => nodeType.type === type);
};
