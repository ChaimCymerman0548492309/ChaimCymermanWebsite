import React, { useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface RightClickMenuProps {
  isVisible: boolean;
  mouseX: number;
  mouseY: number;
  onVisibilityChange: (isVisible: boolean) => void;
  handleClose: () => void;
}

const RightClickMenu: React.FC<RightClickMenuProps> = ({
  isVisible,
  mouseX,
  mouseY,
  onVisibilityChange,
  handleClose
}) => {
  useEffect(() => {
    onVisibilityChange(isVisible);
  }, [isVisible, onVisibilityChange]);

  return (
    <Menu
      open={isVisible}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: mouseY, left: mouseX }}
    >
      <MenuItem onClick={handleClose}>Option 1</MenuItem>
      <MenuItem onClick={handleClose}>Option 2</MenuItem>
      <MenuItem onClick={handleClose}>Option 3</MenuItem>
    </Menu>
  );
};

export default RightClickMenu;
