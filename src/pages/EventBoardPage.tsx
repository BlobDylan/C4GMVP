import { Box } from "@mui/material";
import { AvailableEvents } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";

function EventBoardPage() {
  const { error } = useEvents();
  const { enqueueSnackbar } = useSnackbar();
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
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
