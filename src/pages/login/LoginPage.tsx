import { Box, Button, Card, CircularProgress, Container, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useAuthService } from "../../hooks/services/authenticate/useAuthService";

type FormFields = {
  emailOrUsername: string
  password: string
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit
  } = useForm<FormFields>()

  const {
    login,
    loading
  } = useAuthService();

  const onSubmit = (data: FormFields) => {
    login({
      emailOrUsername: data.emailOrUsername,
      password: data.password
    });
  }

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Card variant="outlined" sx={{ padding: 2, width: '30vw', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Bem vindo ao Wave Chat
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              {...register('emailOrUsername')}
              label="Email ou Usuário"
              type="text"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register('password')}
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={27} sx={{ color: "white" }} /> : 'Entrar'}
          </Button>
        </form>
      </Card>
    </Container>
  )
}

