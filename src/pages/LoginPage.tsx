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
          width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          maxWidth: "500px",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login;
