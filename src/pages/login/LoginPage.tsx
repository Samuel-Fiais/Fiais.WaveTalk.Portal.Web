import { Box, Button, Card, Container, Typography } from "@mui/material"
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { RegisterForm } from "./components/RegisterForm";

export const LoginPage = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Card variant="outlined" sx={{ padding: 2, width: { xs: "100%", sm: "50%" } }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {isCreateAccount ? "Criar conta" : "Login"}
        </Typography>
        {!isCreateAccount ? (
          <LoginForm />
        ) : (
          <RegisterForm
            redirectLogin={() => setIsCreateAccount(false)}
          />
        )}
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={() => setIsCreateAccount(!isCreateAccount)}
            fullWidth
          >
            {isCreateAccount ? "Clique aqui para fazer login" : "Não tem uma conta? Cadastre-se"}
          </Button>
        </Box>
      </Card>
    </Container>
  )
}

