import { Box, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventIcon from "@mui/icons-material/Event";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

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
            {user &&
              (user.permissions === "admin" ||
                user.permissions === "super_admin") && (
                <IconButton
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              )}
            <IconButton
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
              }}
              onClick={() => {
                navigate("/available-events");
              }}
            >
              <EventIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  <Typography>{"Welcome, " + user.firstName}</Typography>
                  <IconButton
                    sx={{
                      color: "#fff",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
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
