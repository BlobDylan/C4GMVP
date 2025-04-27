import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      pending: string;
      approved: string;
      unassigned: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      pending: string;
      approved: string;
      unassigned: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fadf1c",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: "#b0bec5",
    },
    custom: {
      pending: "#ffdf20",
      approved: "#86efac",
      unassigned: "#f87171",
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#fadf1c",
          color: "#000",
          "&:hover": {
            backgroundColor: "#e8cf1a",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          "& .MuiInputBase-root": {
            color: "#fff",
          },
          "& .MuiInputLabel-root": {
            color: "#fff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "& .MuiInputBase-input": {
            color: "#fff",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
