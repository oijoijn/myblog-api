import { Box, Container, Typography, TextField, Button } from '@mui/material'

export const Signup = () => {
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
          <Typography variant="h5">登録画面</Typography>

          <TextField
            required
            fullWidth
            name="username"
            label="ニックネーム"
            id="username"
          />
          <TextField
            required
            fullWidth
            name="password1"
            label="パスワード"
            type="password"
            id="password1"
          />
          <TextField
            required
            fullWidth
            name="password2"
            label="確認用パスワード"
            type="password"
            id="password2"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登録
          </Button>
        </Box>
      </Container>
    </>
  )
}
