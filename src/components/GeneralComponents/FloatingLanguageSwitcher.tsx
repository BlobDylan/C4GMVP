import React, { useState } from "react";
import { Box, Fab, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const FloatingLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    setAnchorEl(null);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Fab size="medium" color="primary" onClick={handleClick}>
        <LanguageIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "top",    
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom", 
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 3,
          sx: { mt: -1 }, 
        }}
      >
        <MenuItem onClick={() => handleClose("he")}>עברית</MenuItem>
        <MenuItem onClick={() => handleClose("en")}>English</MenuItem>
      </Menu>
    </Box>
  );
};

export default FloatingLanguageSwitcher;
