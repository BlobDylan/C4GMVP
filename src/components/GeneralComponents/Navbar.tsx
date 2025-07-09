import { Box, Toolbar, Stack, IconButton } from "@mui/material";
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

  return (
    <>
      <AppBar sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="סמל מטה משפחות החטופים"
            style={{ height: "40px", marginLeft: "10px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction={"row"} spacing={2}>
            {user &&
              (user.permissions === "admin" ||
                user.permissions === "super_admin") && (
                <IconButton
                  aria-label={t("navbar.adminPanel")}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                    fontFamily: `'Inter', sans-serif`,
                  }}
                  onClick={() => navigate("/admin")}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              )}
            <IconButton
              aria-label={t("navbar.myEvents")}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
                fontFamily: `'Inter', sans-serif`,
              }}
              onClick={() => navigate("/my-events")}
            >
              <EventIcon />
            </IconButton>
            <IconButton
              aria-label={t("navbar.home")}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "transparent" },
                fontFamily: `'Inter', sans-serif`,
              }}
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  <Box sx={{ color: "#fff", marginRight: 1, fontFamily: `'Heebo', sans-serif` }}>
                    {t("navbar.welcome")}, {user.firstName}
                  </Box>
                  <IconButton
                    aria-label={t("navbar.logout")}
                    sx={{
                      color: "#fff",
                      "&:hover": { backgroundColor: "transparent" },
                      fontFamily: `'Inter', sans-serif`,
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
                  aria-label={t("navbar.login")}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "transparent" },
                    fontFamily: `'Inter', sans-serif`,
                  }}
                  onClick={() => navigate("/login")}
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
