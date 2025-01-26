import { Button, Menu } from '@mui/material';
import { useMenu } from '../hooks/useMenu';
import { useContext } from 'react';
import { CookiesContext } from '../providers/CookiesContext';

export default function BasicMenu() {
    const
        { anchorEl, open, handleClick, handleClose, renderMenuItems }
            = useMenu()
    const { cookies } = useContext(CookiesContext)

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='inherit'
            >
                {cookies.UserName || 'Menu'}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {renderMenuItems()}
            </Menu>
        </div>
    );
}
