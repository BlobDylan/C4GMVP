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
          maxWidth: "600px",
        }}
      >
        <SignUpForm />
      </Box>
    </Box>
  );
}

export default SignUpPage;
