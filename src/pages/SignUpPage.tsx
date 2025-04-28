import { Box } from "@mui/material";
import { SignUpForm } from "../components";

function SignUpPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60dvh",
        width: "100dvw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40dvw",
        }}
      >
        <SignUpForm />
      </Box>
    </Box>
  );
}

export default SignUpPage;
