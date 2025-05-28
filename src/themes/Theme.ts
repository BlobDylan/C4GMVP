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
    mode: "light",
    primary: {
      main: "#1976d2", // Classic blue instead of black
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff4081", // Vibrant pink instead of yellow
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5", // Light gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)", // Standard dark text
      secondary: "rgba(0, 0, 0, 0.6)", // Slightly muted
    },
    custom: {
      pending: "#ffb74d", // Soft orange
      approved: "#81c784", // Soft green
      unassigned: "#e57373", // Soft red
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    button: {
      textTransform: "none", // Buttons with normal case text
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2",
          color: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          "& .MuiInputBase-root": {
            color: "rgba(0, 0, 0, 0.87)",
          },
          "& .MuiInputLabel-root": {
            color: "rgba(0, 0, 0, 0.6)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.5)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
            borderWidth: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "fff",
          "&:hover": {
            backgroundColor: "#fff",
            color: "fff",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export default theme;
