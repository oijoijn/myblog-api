import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUserContext } from '../providers/LoginUserContext';
import { CookiesContext } from '../providers/CookiesContext';

export const useMenu = () => {
    const { loginUser } = useContext(LoginUserContext);
    const { logout } = useContext(CookiesContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickLogout = () => {
        logout();
        navigate('/login')
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
        { loginUser, anchorEl, open, handleClick, handleClose, handleClickLogout, handleClickSignup, handleClickLogin }
    )
}
