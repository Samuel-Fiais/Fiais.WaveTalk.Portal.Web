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
  
  const form = useForm<LoginFormFields>()

  const onSubmit = (data: LoginFormFields) => {
    login({
      emailOrUsername: data.emailOrUsername,
      password: data.password
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          {...form.register('emailOrUsername', {
            required: 'Email ou Usuário é obrigatório'
          })}
          label="Email ou Usuário"
          type="text"
          fullWidth
          margin="normal"
          helperText={form.formState.errors.emailOrUsername?.message}
          error={!!form.formState.errors.emailOrUsername}
        />
        <TextField
          {...form.register('password', {
            required: 'Senha é obrigatória'
          })}
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          helperText={form.formState.errors.password?.message}
          error={!!form.formState.errors.password}
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