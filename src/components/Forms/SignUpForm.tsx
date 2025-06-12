import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  Checkbox,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup
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
    preferredLanguages: [],
    role: "Family Representative",
  });

  const languages = [
    { label: "עברית", value: "Hebrew" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Russian", value: "Russian" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
  ];

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("סיסמאות לא תואמות");
      return;
    }

    // Create sanitized payload
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      preferredLanguages: formData.preferredLanguages,
      role: formData.role,
    } as SignupData;

    await signup(payload);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleLanguageChange = (languageValue: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(languageValue)
        ? prev.preferredLanguages.filter((lang) => lang !== languageValue)
        : [...prev.preferredLanguages, languageValue],
    }));
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
  }, [formData.password, formData.confirmPassword]);

  const columns = 4;
  const columnSize = Math.ceil(languages.length / columns);
  const languageColumns = Array.from({ length: columns }, (_, i) =>
    languages.slice(i * columnSize, (i + 1) * columnSize)
  );
  return (
    <Box sx={{ mt: "30dvh" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          צור חשבון חדש
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            name="firstName"
            label="שם פרטי"
            size="small"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            name="lastName"
            label="שם משפחה"
            size="small"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Stack>

        <TextField
          name="email"
          type="email"
          label="אימייל"
          size="small"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          name="phoneNumber"
          label="מספר טלפון"
          size="small"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="password"
          type="password"
          label="סיסמה"
          size="small"
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
          label="אשר סיסמה"
          size="small"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Role:
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={formData.role}
          exclusive
          onChange={(e, newRole) => {
            if (newRole !== null) {
              setFormData((prev) => ({ ...prev, role: newRole }));
            }
          }}
          aria-label="Role"
          sx={{ my: 1 }}
        >
          <ToggleButton value="Family Representative">Family Rep</ToggleButton>
          <ToggleButton value="Guide">Guide</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          שפות מועדפות:
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
          justifyContent="space-between"
        >
          {languageColumns.map((column, columnIndex) => (
            <Grid
              sx={{
                xs: 12,
                sm: 6,
              }}
              key={`column-${columnIndex}`}
            >
              {column.map((lang) => (
                <Box
                  key={lang.value}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={formData.preferredLanguages.includes(lang.value)}
                    onChange={() => handleLanguageChange(lang.value)}
                  />
                  <Typography>{lang.label}</Typography>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || disableSubmit}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "הרשמה"}
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          כבר יש לך חשבון? התחבר
        </Button>
      </form>
    </Box>
  );
}

export default SignUpForm;
