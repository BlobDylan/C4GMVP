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
          width: { xs: "100%", sm: "400px", md: "450px" },
          maxWidth: "100%",
        }}
      >
        <SignUpForm />
      </Box>
    </Box>
  );
}

export default SignUpPage;
