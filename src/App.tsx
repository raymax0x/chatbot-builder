/**
 * Main App Component
 * 
 * The root component of the Chatbot Builder application.
 * Orchestrates the layout and main components of the application.
 */
import React, { useCallback } from 'react';

// Import modular components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Flow from './components/layout/Flow';

// Import styles
import './styles/index.css';

/**
 * App component - Main application container
 * 
 * @returns {JSX.Element} Rendered application
 */
const App: React.FC = () => {
  /**
   * Handles saving the flow
   */
  const handleSave = useCallback(() => {
    // Flow component handles the actual save logic
    // This is just a pass-through function
    console.log('Save triggered from App component');
  }, []);

  return (
    <div className='app-container'>
      {/* Top navigation bar */}
      <Navbar onSave={handleSave} />
      
      {/* Main content area */}
      <div className='main-content'>
        {/* Flow canvas */}
        <Flow onSave={handleSave} />
        
        {/* Sidebar with draggable nodes */}
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
