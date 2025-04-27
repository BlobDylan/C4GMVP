import { Box, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Volunteer Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} spacing={2}>
            <IconButton
              onClick={() => {
                navigate("/Admin");
              }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <Typography>{"Welcome, " + user.name}</Typography>
              ) : (
                <IconButton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LoginIcon />
                </IconButton>
              )}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "10px",
        }}
      ></Box>
    </>
  );
}

export default Navbar;
