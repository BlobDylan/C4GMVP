import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./hooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import "./i18n"; // Import i18n for translations
import { useTranslation } from "react-i18next";
import theme from "./themes/Theme";
import { Navbar } from "./components";
import FloatingLanguageSwitcher from "./components/GeneralComponents/FloatingLanguageSwitcher";

import {
  LoginPage,
  SignUpPage,
  EventBoardPage,
  AdminPage,
  MyEventsPage,
} from "./pages";

function App() {
  
  console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
  const { i18n, t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AppProvider>
          <Router>
            <CssBaseline />
            <div dir={i18n.language === "he" ? "rtl" : "ltr"}>
              <Navbar />
              
              {/* Routes */}
              <Routes>
                <Route path="/" element={<EventBoardPage />} />
                <Route path="/available-events" element={<EventBoardPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>

              {/* Floating language switcher */}
              <FloatingLanguageSwitcher />
            </div>
          </Router>
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
