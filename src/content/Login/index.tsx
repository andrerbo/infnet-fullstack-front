import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LoginService from '../../services/LoginService';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let loginService: LoginService = new LoginService();
    loginService.login(username, password)
      .then((response) => {
        localStorage.setItem('token', response.data["token"]);
        navigate("/home");
      }).catch((error) => {
        setLoading(false);
        setError("Usuário ou Senha Inválidos");
    })
  }

  return (
    <Container maxWidth="lg"
               component="main"
               sx={{
                 height: '100vh',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
    >
      <Paper elevation={6}
             sx={{
               padding: 3,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               width: "100%",
               maxWidth: 400
             }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        { error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
            { error }
          </Typography>
          )}
        <Box component="form"
             sx={{ width: '100%', marginTop: 2 }}
             noValidate
        >
          <TextField label="Usuário"
                     fullWidth
                     variant="outlined"
                     margin="normal"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
          />
          <TextField label="Senha"
                     fullWidth
                     variant="outlined"
                     margin="normal"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
          />
            <Button fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{ marginTop: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
            </Button>
        </Box>
      </Paper>
    </Container>
  )
}
export default Login;