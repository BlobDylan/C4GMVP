import { Box, Toolbar, Stack, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            Volunteer Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} spacing={{ xs: 1, sm: 2 }}>
            {user &&
              (user.permissions === "admin" ||
                user.permissions === "super_admin") && (
                <IconButton
                  onClick={() => {
                    navigate("/admin");
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              )}
            <IconButton
              onClick={() => {
                navigate("/");
              }}
              size={isMobile ? "small" : "medium"}
            >
              <HomeIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  {!isMobile && (
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                      {"Welcome, " + user.firstName}
                    </Typography>
                  )}
                  <IconButton
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    size={isMobile ? "small" : "medium"}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  size={isMobile ? "small" : "medium"}
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
          p: { xs: 2, sm: 3 },
          marginTop: "10px",
        }}
      ></Box>
    </>
  );
}

export default Navbar;
