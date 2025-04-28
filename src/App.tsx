import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./hooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import theme from "./themes/Theme";
import { Navbar } from "./components";
import { LoginPage, SignUpPage, EventBoardPage, AdminPage } from "./pages";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventBoardPage />} />
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
      <AppProvider>
        <Router>
          <CssBaseline />
          <MainLayout />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
