/**
 * Navbar Component
 * 
 * A React component that renders the top navigation bar of the application.
 * Contains the logo and action buttons like Save Flow.
 * 
 * @component
 */
import React from 'react';

interface NavbarProps {
  /**
   * Callback function for when the save button is clicked
   */
  onSave: () => void;
}

/**
 * Navbar component for the top navigation bar
 * 
 * @param {NavbarProps} props - Component props
 * @returns {JSX.Element} Rendered navbar component
 */
const Navbar: React.FC<NavbarProps> = ({ onSave }) => {
  return (
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
  );
};

export default Navbar;
