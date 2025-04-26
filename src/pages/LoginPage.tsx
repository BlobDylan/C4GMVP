import { Box, Button } from "@mui/material";
import { useState } from "react";
import { LoginForm, SignUpForm } from "../components";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

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
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <Button
          variant="contained"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ marginTop: 2, marginBottom: 2 }}
          fullWidth
        >
          {isLogin ? "Create an Account" : "Already have an account?"}
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
