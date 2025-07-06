import { Box, Toolbar, Stack, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventIcon from "@mui/icons-material/Event";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex", px: { xs: 1, sm: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h6"}
            onClick={() => {
              navigate("/");
            }}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              flexShrink: 0,
            }}
          >
            {t("navbar.title")}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack 
            direction={"row"} 
            spacing={{ xs: 1, sm: 2 }}
            sx={{ flexShrink: 0 }}
          >
            {user &&
              (user.permissions === "admin" ||
                user.permissions === "super_admin") && (
                <IconButton
                  aria-label={t("navbar.adminPanel")}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                    padding: { xs: 0.5, sm: 1 },
                  }}
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  <AdminPanelSettingsIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
                </IconButton>
              )}
            <IconButton
              aria-label={t("navbar.myEvents")}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
                padding: { xs: 0.5, sm: 1 },
              }}
              onClick={() => {
                navigate("/my-events");
              }}
            >
              <EventIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
            </IconButton>
            <IconButton
              aria-label={t("navbar.home")}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
                padding: { xs: 0.5, sm: 1 },
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  <Typography 
                    sx={{ 
                      color: "#fff", 
                      marginRight: { xs: 0.5, sm: 1 },
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      display: { xs: "none", md: "block" }
                    }}
                  >
                    {t("navbar.welcome")}, {user.firstName}
                  </Typography>
                  <IconButton
                    aria-label={t("navbar.logout")}
                    sx={{
                      color: "#fff",
                      "&:hover": { backgroundColor: "transparent" },
                      padding: { xs: 0.5, sm: 1 },
                    }}
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  aria-label={t("navbar.login")}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                    padding: { xs: 0.5, sm: 1 },
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LoginIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
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
          p: { xs: 1, sm: 3 },
          marginTop: "10px",
        }}
      ></Box>
    </>
  );
}

export default Navbar;
