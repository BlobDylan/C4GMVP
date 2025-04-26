import { Box } from "@mui/material";
import { UpcomingEvents, Calendar } from "../components";
import { useEvents } from "../hooks";

function AdminPage() {
  const { isLoading, error } = useEvents();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
