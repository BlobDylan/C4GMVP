import { Box } from "@mui/material";
import { AvailableEvents, MyEvents } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";

function EventBoardPage() {
  const { isLoading, error } = useEvents();
  const { enqueueSnackbar } = useSnackbar();
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <MyEvents />
      <AvailableEvents />
    </Box>
  );
}

export default EventBoardPage;
