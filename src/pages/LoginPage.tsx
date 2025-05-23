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
        height: "90dvh",
        width: "100dvw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "50vw",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login;
