import { Box } from "@mui/material";
import { LoginForm } from "../components";

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        width: "100%",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", sm: "400px", md: "450px" },
          maxWidth: "100%",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login;
