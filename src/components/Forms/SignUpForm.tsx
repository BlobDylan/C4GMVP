import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useAuth } from "../../hooks";
import { SignupData } from "../../types";

function SignUpForm() {
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    await signup(formData);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      setDisableSubmit(false);
      setPasswordError("");
    } else {
      setDisableSubmit(true);
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  }, [formData.password, formData.confirmPassword, formData]);

  return (
    <Box sx={{ mt: "25dvh" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Create Your Account
        </Typography>

        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={!!passwordError && formData.password !== ""}
        />

        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || disableSubmit}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          Already have an account? Log in
        </Button>
      </form>
    </Box>
  );
}

export default SignUpForm;
