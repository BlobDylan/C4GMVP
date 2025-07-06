import { Box } from "@mui/material";
import { UpcomingEvents, Calendar } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";

function AdminPage() {
  const { error } = useEvents();
  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 1, sm: 2 },
      }}
    >
      <UpcomingEvents />
      <Calendar />
    </Box>
  );
}

export default AdminPage;
