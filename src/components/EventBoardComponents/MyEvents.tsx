import { Box, Typography, Stack } from "@mui/material";
import { MyEventsCard } from "../../components";
import { useEvents } from "../../hooks/useEvents";

function MyEvents() {
  const { myEvents } = useEvents();

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          My Events
        </Typography>
        <Stack
          spacing={3}
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {myEvents.map((event) => (
            <MyEventsCard key={event.id} {...event} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default MyEvents;
