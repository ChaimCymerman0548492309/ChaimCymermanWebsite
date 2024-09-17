import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import DragAndDrop from './Components/DragAndDrop/DragAndDrop';
import RightClickMenu from './Components/DragAndDrop/RightClickMenu';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isRightClickVisible, setIsRightClickVisible] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  // Function to handle right-click event
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default right-click behavior
    setMouseX(e.clientX); // Set the x-coordinate of the mouse
    setMouseY(e.clientY); // Set the y-coordinate of the mouse
    setIsRightClickVisible(true); // Open the menu
  };

  // Function to close the menu
  const handleClose = () => {
    setIsRightClickVisible(false);
  };

  // This function will be triggered whenever the visibility changes
  const handleVisibilityChange = (isVisible: boolean) => {
    console.log(`Right-click menu visibility changed to: ${isVisible}`);
    if (!isVisible) {
      console.log('Right-click menu closed');
    }
  };

  return (
    <ChakraProvider>
      <ErrorBoundary>
        <div
          style={{ height: '95vh' }}
          onContextMenu={handleRightClick}
        >
          <DragAndDrop />
          <RightClickMenu
            isVisible={isRightClickVisible}
            mouseX={mouseX}
            mouseY={mouseY}
            onVisibilityChange={handleVisibilityChange}
            handleClose={handleClose}
          />
        </div>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;