import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUserContext } from '../providers/LoginUserContext';

export default function BasicMenu() {
    const { loginUser } = useContext(LoginUserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickBloglist = () => {
        navigate('/')
        setAnchorEl(null);
    }
    const handleClickLogout = () => {
        navigate('/')
        setAnchorEl(null);
    }
    const handleClickSignup = () => {
        navigate('/signup')
        setAnchorEl(null);
    }
    const handleClickLogin = () => {
        navigate('/login')
        setAnchorEl(null);
    }

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
                <MenuItem onClick={handleClickBloglist}>Home</MenuItem>
                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClickSignup}>Signup</MenuItem>
                <MenuItem onClick={handleClickLogin}>Login</MenuItem>
            </Menu>
        </div>
    );
}
