import { Box } from "@mui/material";
import { MyEvents } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";
import { useAuth } from "../hooks";
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
      <MyEvents />
    </Box>
  );
}

export default EventBoardPage;
