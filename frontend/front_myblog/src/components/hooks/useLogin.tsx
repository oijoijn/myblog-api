import { useContext, useState } from 'react'
import { postApiToken } from '../config/endpoint'
import { useNavigate } from 'react-router-dom'
import { LoginRequest } from '../config/interface'
import { CookiesContext } from '../providers/CookiesContext'

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useContext(CookiesContext)

    const [user, setUser] = useState<LoginRequest>({
        username: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const onClickLogin = async (username: string, password: string) => {
        try {
            await postApiToken({
                username: username,
                password: password,
            });
            login(username, password)
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('ログインに失敗しました。');
        }
    }

    return { user, handleChange, onClickLogin };
}
