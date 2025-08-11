import {
  Box,
  Toolbar,
  Stack,
  IconButton,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Theme,
  Divider,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventIcon from "@mui/icons-material/Event";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Toolbar />
      <List>
        <ListItemButton onClick={() => handleNavigation("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t("navbar.home")} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/my-events")}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary={t("navbar.myEvents")} />
        </ListItemButton>

        {user &&
          (user.permissions === "admin" ||
            user.permissions === "super_admin") && (
            <ListItemButton onClick={() => handleNavigation("/admin")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("navbar.adminPanel")} />
            </ListItemButton>
          )}

        <Divider />

        {/* User section */}
        {user ? (
          <>
            <ListItem>
              <ListItemText
                primary={`${t("navbar.welcome")}, ${user.firstName}`}
                primaryTypographyProps={{ fontFamily: `'Heebo', sans-serif` }}
              />
            </ListItem>
            <ListItemButton
              onClick={() => {
                logout();
                handleNavigation("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t("navbar.logout")} />
            </ListItemButton>
          </>
        ) : (
          <ListItemButton onClick={() => handleNavigation("/login")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={t("navbar.login")} />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="HQ logo"
            style={{ height: "40px", marginLeft: "10px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Stack direction={"row"} spacing={2}>
              {user &&
                (user.permissions === "admin" ||
                  user.permissions === "super_admin") && (
                  <Button
                    aria-label={t("navbar.adminPanel")}
                    sx={{
                      color: "#fff",
                      "&:hover": { backgroundColor: "transparent" },
                      fontFamily: `'Inter', sans-serif`,
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/admin")}
                    startIcon={<AdminPanelSettingsIcon />}
                  >
                    {t("navbar.adminPanel")}
                  </Button>
                )}
              <Button
                aria-label={t("navbar.myEvents")}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "transparent" },
                  fontFamily: `'Inter', sans-serif`,
                  textTransform: "none",
                }}
                onClick={() => navigate("/my-events")}
                startIcon={<EventIcon />}
              >
                {t("navbar.myEvents")}
              </Button>
              <Button
                aria-label={t("navbar.home")}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "transparent" },
                  fontFamily: `'Inter', sans-serif`,
                  textTransform: "none",
                }}
                onClick={() => navigate("/")}
                startIcon={<HomeIcon />}
              >
                {t("navbar.home")}
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {user ? (
                  <>
                    <Typography
                      sx={{
                        color: "#fff",
                        marginRight: 1,
                        fontFamily: `'Heebo', sans-serif`,
                      }}
                    >
                      {t("navbar.welcome")}, {user.firstName}
                    </Typography>
                    <Button
                      aria-label={t("navbar.logout")}
                      sx={{
                        color: "#fff",
                        "&:hover": { backgroundColor: "transparent" },
                        fontFamily: `'Inter', sans-serif`,
                        textTransform: "none",
                      }}
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      startIcon={<LogoutIcon />}
                    >
                      {t("navbar.logout")}
                    </Button>
                  </>
                ) : (
                  <Button
                    aria-label={t("navbar.login")}
                    sx={{
                      color: "#fff",
                      "&:hover": { backgroundColor: "transparent" },
                      fontFamily: `'Inter', sans-serif`,
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/login")}
                    startIcon={<LoginIcon />}
                  >
                    {t("navbar.login")}
                  </Button>
                )}
              </Box>
            </Stack>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor={i18n.language === "he" ? "left" : "right"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 200,
          },
        }}
      >
        {drawer}
      </Drawer>

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
