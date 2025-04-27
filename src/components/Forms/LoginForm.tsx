import { useState, useEffect } from "react";
import { TextField, Typography, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, user, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && !error) {
      navigate("/");
    }
    if (error) {
      console.error("Login error:", error);
    }
  }, [isLoading, user, error, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <Typography variant="h3">Welcome to Volunteer Manager</Typography>
      <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
        Login to Your Account
      </Typography>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <Button variant="contained" onClick={handleLogin} fullWidth>
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Login"
        )}
      </Button>
    </>
  );
}

export default LoginForm;
