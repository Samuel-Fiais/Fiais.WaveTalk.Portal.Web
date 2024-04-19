import { useForm } from "react-hook-form"
import { useCreateUser } from "../../../hooks/services/user/useCreateUser"
import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { useEffect } from "react"

type RegisterFormProps = {
  redirectLogin: () => void
}

export type RegisterFormFields = {
  username: string
  email: string
  name: string
  password: string
}

export const RegisterForm = ({
  redirectLogin
}: RegisterFormProps) => {
  const {
    execute,
    finish,
    loading
  } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormFields>()

  const onSubmit = (data: RegisterFormFields) => {
    execute({
      username: data.username,
      email: data.email,
      name: data.name,
      password: data.password
    });
  }

  useEffect(() => {
    if (finish) {
      redirectLogin();
    }
  }, [finish]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          {...register('name')}
          label="Nome"
          type="text"
          fullWidth
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name?.message} 
        />
        <TextField
          {...register('email')}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register('username')}
          label="Usuário"
          type="text"
          fullWidth
          margin="normal"
          required
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register('password', {
            validate: value => value.length >= 8 || "A senha deve ter no mínimo 8 caracteres"
          })}
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          required
          error={!!errors.password}
          helperText={errors.password?.message}
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
        {loading ? <CircularProgress size={27} sx={{ color: "white" }} /> : 'Registrar'}
      </Button>
    </form>
  )
}