/**
 * MessageIcon Component
 * 
 * A reusable message icon component for use throughout the application.
 * 
 * @component
 */
import React from 'react';

/**
 * Props for the MessageIcon component
 */
interface MessageIconProps {
  /**
   * Width of the icon
   */
  width?: number;
  
  /**
   * Height of the icon
   */
  height?: number;
  
  /**
   * Color of the icon
   */
  color?: string;
}

/**
 * MessageIcon component
 * 
 * @param {MessageIconProps} props - Component props
 * @returns {JSX.Element} Rendered icon component
 */
const MessageIcon: React.FC<MessageIconProps> = ({ 
  width = 16, 
  height = 16, 
  color = 'currentColor' 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default MessageIcon;
