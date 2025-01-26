import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUserContext } from '../providers/LoginUserContext';
import { CookiesContext } from '../providers/CookiesContext';
import MenuItem from '@mui/material/MenuItem';

export const useMenu = () => {
    const { loginUser } = useContext(LoginUserContext);
    const { logout, cookies } = useContext(CookiesContext)
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
    const handleClickCommentlist = () => {
        navigate('/commentslist')
        setAnchorEl(null);
    }
    const renderMenuItems = () => {
        if (cookies.UserName) {
            return (
                <>
                    <MenuItem onClick={handleClickCommentlist}>アカウント情報</MenuItem>
                    <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
                </>
            );
        } else {
            return (
                <>
                    <MenuItem onClick={handleClickSignup}>新規登録</MenuItem>
                    <MenuItem onClick={handleClickLogin}>ログイン</MenuItem>
                </>
            )
        }
    }

    return (
        { loginUser, anchorEl, open, handleClick, handleClose, handleClickLogout, handleClickSignup, handleClickLogin, handleClickCommentlist, renderMenuItems }
    )
}
