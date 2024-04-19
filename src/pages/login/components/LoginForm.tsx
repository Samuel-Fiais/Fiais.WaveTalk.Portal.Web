import { Box, TextField, Button, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import { useAuthService } from "../../../hooks/services/authenticate/useAuthService"

export type LoginFormFields = {
  emailOrUsername: string
  password: string
}

export const LoginForm = () => {
  const {
    login,
    loading
  } = useAuthService();
  
  const {
    register,
    handleSubmit
  } = useForm<LoginFormFields>()

  const onSubmit = (data: LoginFormFields) => {
    login({
      emailOrUsername: data.emailOrUsername,
      password: data.password
    });
  }

  return (
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
  )
}