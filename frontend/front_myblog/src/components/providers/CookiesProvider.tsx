import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { postApiToken } from '../config/endpoint';
import { LoginUserContext } from './LoginUserContext';
import { CookiesContext } from './CookiesContext';

export const CookiesProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const { setLoginUser } = useContext(LoginUserContext)
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);

    const login = async (username: string, password: string) => {
        try {
            const response = await postApiToken({ username, password });
            setCookie('access_token', response.access, { path: '/', secure: true, sameSite: 'strict' });
            setCookie('refresh_token', response.refresh, { path: '/', secure: true, sameSite: 'strict' });
            setLoginUser({ username: username })
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('ログインに失敗しました。');
        }
    };

    const logout = () => {
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
        setLoginUser({ username: '' });
    };

    return (
        <CookiesContext.Provider value={{ login, logout, cookies }}>
            {children}
        </CookiesContext.Provider>
    );
};
