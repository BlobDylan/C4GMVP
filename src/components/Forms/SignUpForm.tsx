import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks";
import { SignupData } from "../../types";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isLoading, error, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && !error) {
      navigate("/");
    }
    if (error) {
      console.error("Signup error:", error);
    }
  }, [isLoading, error, navigate]);

  const handleSignUp = () => {
    const signupData: SignupData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };
    signup(signupData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography variant="h3">Welcome to Volunteer Manager</Typography>
      <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
        Create Your Account
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Last Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" onClick={handleSignUp} fullWidth>
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Sign Up"
        )}
      </Button>
    </>
  );
}

export default SignUpForm;
