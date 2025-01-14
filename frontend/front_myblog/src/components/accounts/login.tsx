import { Box, Container, Typography, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const { user, handleChange, onClickLogin } = useLogin();

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
            onClick={() => onClickLogin(user.username, user.password)}
          >
            ログイン
          </Button>
          <Link to='/signup'>新規登録はこちら</Link>
        </Box>
      </Container>
    </>
  )
}
