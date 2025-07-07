import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./hooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline, Button, Box } from "@mui/material";
import "./i18n"; // Import i18n for translations
import { useTranslation } from "react-i18next";
import theme from "./themes/Theme";
import { Navbar } from "./components";
import {
  LoginPage,
  SignUpPage,
  EventBoardPage,
  AdminPage,
  MyEventsPage,
} from "./pages";

function App() {
  const { i18n, t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AppProvider>
          <Router>
            <CssBaseline />
            <div dir={i18n.language === "he" ? "rtl" : "ltr"}>
              <Navbar />
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: { xs: 1, sm: 1 }, 
                mt: 2,
                px: { xs: 1, sm: 2 },
                flexWrap: "wrap",
              }}>
                <Button 
                  variant="outlined" 
                  onClick={() => i18n.changeLanguage("en")}
                  size="small"
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    padding: { xs: "4px 8px", sm: "6px 16px" },
                  }}
                >
                  English
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => i18n.changeLanguage("he")}
                  size="small"
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    padding: { xs: "4px 8px", sm: "6px 16px" },
                  }}
                >
                  עברית
                </Button>
              </Box>

              <Routes>
                <Route path="/" element={<EventBoardPage />} />
                <Route path="/available-events" element={<EventBoardPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
