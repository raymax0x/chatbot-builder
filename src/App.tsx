/**
 * Main App Component
 *
 * The root component of the Chatbot Builder application.
 * Orchestrates the layout and main components of the application.
 */
import React, { useCallback, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // Reference to the Flow component's save function
  const flowSaveFunctionRef = useRef<(() => boolean) | null>(null);

  /**
   * Handles saving the flow
   * This delegates to the Flow component's save function to ensure validation is used
   */
  const handleSave = useCallback(() => {
    // Call the Flow component's save function if available
    if (flowSaveFunctionRef.current) {
      // Call the Flow component's save function, which handles validation
      // The function returns a boolean indicating whether validation passed
      const saveSuccessful = flowSaveFunctionRef.current();
      
      // Only show success toast if validation passed
      if (saveSuccessful) {
        toast.success('Flow saved successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, []);

  /**
   * Callback to store the Flow component's save function
   */
  const registerFlowSaveFunction = useCallback((saveFunction: () => boolean) => {
    flowSaveFunctionRef.current = saveFunction;
  }, []);

  return (
    <div className='app-container'>
      {/* Top navigation bar */}
      <Navbar onSave={handleSave} />
      
      {/* Main content area */}
      <div className='main-content'>
        {/* Flow canvas */}
        <Flow onSave={handleSave} registerSaveFunction={registerFlowSaveFunction} />
        
        {/* Sidebar with draggable nodes */}
        <Sidebar />
      </div>
      
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
