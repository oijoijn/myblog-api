import { useContext, useState } from 'react'
import { postApiToken } from '../config/endpoint'
import { LoginUserContext } from '../providers/LoginUserContext'
import { useNavigate } from 'react-router-dom'
import { LoginRequest } from '../config/interface'
import { CookiesContext } from '../providers/CookiesContext'

export const useLogin = () => {
    const { setLoginUser } = useContext(LoginUserContext)
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

    const onClickLogin = async () => {
        try {
            const response = await postApiToken(user);
            console.log('Login successful:', response);
            login(user.username, user.password)
            setLoginUser({ username: user.username })
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('ログインに失敗しました。');
        }
    }

    return { handleChange, onClickLogin };
}
