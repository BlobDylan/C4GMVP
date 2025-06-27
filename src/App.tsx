import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./hooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import theme from "./themes/Theme";
import { Navbar } from "./components";
import {
  LoginPage,
  SignUpPage,
  EventBoardPage,
  AdminPage,
  MyEventsPage,
} from "./pages";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventBoardPage />} />
        <Route path="/available-events" element={<EventBoardPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AppProvider>
          <Router>
            <CssBaseline />
            <MainLayout />
          </Router>
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
