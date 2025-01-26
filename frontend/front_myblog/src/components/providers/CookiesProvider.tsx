import { useCookies } from 'react-cookie';
import { postApiToken } from '../config/endpoint';
import { CookiesContext } from './CookiesContext';
import { useNavigate } from 'react-router-dom';

export const CookiesProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'UserName']);
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        try {
            const response = await postApiToken({ username, password });
            setCookie('access_token', response.access, { path: '/', secure: true, sameSite: 'strict' });
            setCookie('refresh_token', response.refresh, { path: '/', secure: true, sameSite: 'strict' });
            setCookie('UserName', username, { path: '/' });
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('ログインに失敗しました。');
        }
    };

    const logout = () => {
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
        removeCookie('UserName', { path: '/' });
        navigate('/login')
    };

    return (
        <CookiesContext.Provider value={{ login, logout, cookies }}>
            {children}
        </CookiesContext.Provider>
    );
};
