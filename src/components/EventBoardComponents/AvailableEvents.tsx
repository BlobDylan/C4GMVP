import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { EventBoardCard, EventBoardCardSkeleton } from "../../components";
import { useEvents } from "../../hooks";

function AvailableEvents() {
  const { events, myEvents, isLoading } = useEvents();
  const numCardsToLoad = 4;

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
          Available Events
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
          }}
        >
          {isLoading
            ? Array.from({ length: numCardsToLoad }, (_, index) => (
                <Grid key={index} sx={{ xs: 12, sm: 6 }}>
                  <EventBoardCardSkeleton />
                </Grid>
              ))
            : events
                .filter(
                  (event) =>
                    !myEvents.some((myEvent) => myEvent.id === event.id)
                )
                .map((event) => (
                  <Grid key={event.id} sx={{ xs: 12, sm: 6 }}>
                    <EventBoardCard {...event} />
                  </Grid>
                ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AvailableEvents;
