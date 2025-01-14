import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMenu } from '../hooks/useMenu';

export default function BasicMenu() {
    const
        { loginUser, anchorEl, open, handleClick, handleClose, handleClickLogout, handleClickSignup, handleClickLogin }
            = useMenu()

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
                {loginUser.username || 'Menu'}
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
                <MenuItem onClick={handleClickSignup}>新規登録</MenuItem>
                <MenuItem onClick={handleClickLogin}>ログイン</MenuItem>
                <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
                {/* <MenuItem onClick={handlecookie}>cookie</MenuItem> */}
            </Menu>
        </div>
    );
}
