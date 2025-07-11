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
  ToggleButtonGroup,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useAuth } from "../../hooks";
import { SignupData } from "../../types";
import { useTranslation } from "react-i18next";

function SignUpForm() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    { label: t("signUp.languages.hebrew"), value: "Hebrew" },
    { label: t("signUp.languages.english"), value: "English" },
    { label: t("signUp.languages.arabic"), value: "Arabic" },
    { label: t("signUp.languages.russian"), value: "Russian" },
    { label: t("signUp.languages.french"), value: "French" },
    { label: t("signUp.languages.spanish"), value: "Spanish" },
  ];

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t("signUp.errors.passwordMismatch"));
      return;
    }

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
        setPasswordError(t("signUp.errors.passwordMismatch"));
      } else {
        setPasswordError("");
      }
    }
  }, [formData.password, formData.confirmPassword, t]);

  const columns = isMobile ? 2 : 4;
  const columnSize = Math.ceil(languages.length / columns);
  const languageColumns = Array.from({ length: columns }, (_, i) =>
    languages.slice(i * columnSize, (i + 1) * columnSize)
  );

  return (
    <Box sx={{ mt: { xs: "10vh", sm: "30vh" } }}>
      <form onSubmit={handleSubmit}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontSize: { xs: "1.75rem", sm: "2.125rem" },
            textAlign: "center",
            mb: 3
          }}
        >
          {t("signUp.title")}
        </Typography>

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <TextField
            name="firstName"
            label={t("signUp.firstName")}
            size="small"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            name="lastName"
            label={t("signUp.lastName")}
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
          label={t("signUp.email")}
          size="small"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          name="phoneNumber"
          label={t("signUp.phoneNumber")}
          size="small"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="password"
          type="password"
          label={t("signUp.password")}
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
          label={t("signUp.confirmPassword")}
          size="small"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />

        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.25rem" }
          }}
        >
          {t("signUp.role")}
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
          aria-label={t("signUp.role")}
          sx={{ 
            my: 1,
            width: "100%",
            '& .MuiToggleButton-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              padding: { xs: '8px 12px', sm: '10px 16px' },
            }
          }}
        >
          <ToggleButton value="Family Representative" sx={{ flex: 1 }}>
            {t("signUp.roles.familyRep")}
          </ToggleButton>
          <ToggleButton value="Guide" sx={{ flex: 1 }}>
            {t("signUp.roles.guide")}
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.25rem" }
          }}
        >
          {t("signUp.preferredLanguages")}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }} justifyContent="space-between">
          {languageColumns.map((column, columnIndex) => (
            <Grid item xs={6} sm={3} key={`column-${columnIndex}`}>
              {column.map((lang) => (
                <Box key={lang.value} sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={formData.preferredLanguages.includes(lang.value)}
                    onChange={() => handleLanguageChange(lang.value)}
                    size="small"
                  />
                  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                    {lang.label}
                  </Typography>
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
          sx={{ 
            mt: 3,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            padding: { xs: "10px 16px", sm: "12px 24px" }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : t("signUp.signUpButton")}
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{ 
            mt: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            padding: { xs: "10px 16px", sm: "12px 24px" }
          }}
        >
          {t("signUp.alreadyHaveAccount")}
        </Button>
      </form>
    </Box>
  );
}

export default SignUpForm;
