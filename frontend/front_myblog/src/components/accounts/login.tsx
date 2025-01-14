import { Box, Container, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { LoginRequest } from '../config/interface'
import { useContext, useState } from 'react'
import { postApiToken } from '../config/endpoint'
import { LoginUserContext } from '../providers/LoginUserContext'

export const Login = () => {

  const { setLoginUser } = useContext(LoginUserContext)
  const navigate = useNavigate();

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
      localStorage.setItem('token', response.access);
      setLoginUser({username: user.username})
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('ログインに失敗しました。');
    }
  };

  return (
    <>
      <Container maxWidth='xs'>
        <Box
          sx={{
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h5">ログイン画面</Typography>

          <TextField
            required
            fullWidth
            name="username"
            label="ニックネーム"
            id="username"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClickLogin}
          >
            ログイン
          </Button>
          <Link to='/signup'>新規登録はこちら</Link>
        </Box>
      </Container>
    </>
  )
}
