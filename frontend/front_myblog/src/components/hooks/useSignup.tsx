import { useNavigate } from 'react-router-dom';
import { postAccountsSignup } from '../config/endpoint';
import { useContext, useState } from 'react';
import { SignupRequest } from '../config/interface';
import { CookiesContext } from '../providers/CookiesContext';

export const useSignup = () => {
    const { login } = useContext(CookiesContext)
    const [SignupUser, setSignupUser] = useState<SignupRequest>({
        username: '',
        password1: '',
        password2: '',
    })
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignupUser({ ...SignupUser, [name]: value })
    }
    const handleSignup = async (username:string, password1:string, password2:string) => {
        try {
            const response = await postAccountsSignup({
                username: username,
                password1: password1,
                password2: password2,
            });
            console.log('Sign successful:', response.username);
            login(username, password1)
            navigate('/');
        } catch (error) {
            console.error('Sign failed:', error);
            alert('新規登録に失敗しました。');
        }
    }

    return (
        {SignupUser, handleChange, handleSignup }
    )
}
