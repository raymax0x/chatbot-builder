/**
 * SaveIcon Component
 * 
 * A reusable save icon component for use throughout the application.
 * 
 * @component
 */
import React from 'react';

/**
 * Props for the SaveIcon component
 */
interface SaveIconProps {
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
 * SaveIcon component
 * 
 * @param {SaveIconProps} props - Component props
 * @returns {JSX.Element} Rendered icon component
 */
const SaveIcon: React.FC<SaveIconProps> = ({ 
  width = 16, 
  height = 16, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>
      <polyline points='17 21 17 13 7 13 7 21'></polyline>
      <polyline points='7 3 7 8 15 8'></polyline>
    </svg>
  );
};

export default SaveIcon;
