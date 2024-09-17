import React, { useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface RightClickMenuProps {
    isVisible: boolean;
    mouseX: number;
    mouseY: number;
    onVisibilityChange: (isVisible: boolean) => void;
    handleClose: () => void;
    options: string[];
    onOptionSelect: (option: string) => void;
}

const RightClickMenu: React.FC<RightClickMenuProps> = ({
    isVisible,
    mouseX,
    mouseY,
    onVisibilityChange,
    handleClose,
    options,
    onOptionSelect
}) => {
    useEffect(() => {
        onVisibilityChange(isVisible);
    }, [isVisible, onVisibilityChange]);

    const handleMenuItemClick = (option: string) => {

        onOptionSelect(option);
        handleClose();
    };

    return (
        <Menu
            open={isVisible}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: mouseY, left: mouseX }}
        >
            {options.map((option, index) => (
                <MenuItem key={index} onClick={() => handleMenuItemClick(option)}>
                    {option}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default RightClickMenu;
