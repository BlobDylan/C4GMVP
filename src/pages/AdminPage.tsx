import { Box } from "@mui/material";
import { UpcomingEvents, Calendar } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";

function AdminPage() {
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
      <Calendar />
      <UpcomingEvents />
    </Box>
  );
}

export default AdminPage;
