import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useAuth } from "../../hooks";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      // Error handling is already done in useAuth
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("login.title")}
      </Typography>

      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        {t("login.subtitle")}
      </Typography>

      <TextField
        fullWidth
        type="email"
        label={t("login.email")}
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        type="password"
        label={t("login.password")}
        name="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />

      {error && (
        <FormHelperText error sx={{ mb: 2 }}>
          {error}
        </FormHelperText>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : t("login.loginButton")}
      </Button>

      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate("/signup")}
        sx={{ mt: 2 }}
      >
        {t("login.signupButton")}
      </Button>
    </Box>
  );
}

export default LoginForm;
