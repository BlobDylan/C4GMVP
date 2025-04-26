import { Box } from "@mui/material";
import { AvailableEvents, MyEvents } from "../components";
import { useEvents } from "../hooks";

function EventBoardPage() {
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
      <MyEvents />
      <AvailableEvents />
    </Box>
  );
}

export default EventBoardPage;
