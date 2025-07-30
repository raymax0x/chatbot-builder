/**
 * Navbar Component
 * 
 * A React component that renders the top navigation bar of the application.
 * Contains the logo and action buttons like Save Flow.
 * 
 * @component
 */
import React from 'react';
import { SaveIcon } from '../icons';

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
        <SaveIcon width={16} height={16} />
        Save Flow
      </button>
    </div>
  );
};

export default Navbar;
