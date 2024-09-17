import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import DragAndDrop from './Components/DragAndDrop/DragAndDrop';
import RightClickMenu from './Components/DragAndDrop/RightClickMenu';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isRightClickVisible, setIsRightClickVisible] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  const menuOptions = ['Option 1', 'Option 2', 'Option 3'];

  const handleRightClick = (e: React.MouseEvent) => {
    
    e.preventDefault();
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setIsRightClickVisible(true);
  };

  const handleClose = () => {
    setIsRightClickVisible(false);
  };

  const handleVisibilityChange = (isVisible: boolean) => {
    
    console.log(`Right-click menu visibility changed to: ${isVisible}`);
    if (!isVisible) {
      console.log('Right-click menu closed');
    }
  };

  const handleOptionSelect = (option: string) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <ChakraProvider>
      <ErrorBoundary>
        <div
          style={{ height: '95vh' }}
          onContextMenu={handleRightClick}
        >23213232132
          {/* <DragAndDrop /> */}
          <RightClickMenu
            isVisible={isRightClickVisible}
            mouseX={mouseX}
            mouseY={mouseY}
            onVisibilityChange={handleVisibilityChange}
            handleClose={handleClose}
            options={menuOptions}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
