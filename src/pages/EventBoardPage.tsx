import { Box } from "@mui/material";
import { AvailableEvents } from "../components";
import { useEvents } from "../hooks";
import { useAuth } from "../hooks";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EventBoardPage() {
  const { error } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <AvailableEvents />
    </Box>
  );
}

export default EventBoardPage;
